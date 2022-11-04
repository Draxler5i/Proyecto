import client from '../database/conection'
import creditCardService from './creditCard.service'
import ticketService from './ticket.service'

const postSale = async (idUser: number, idTicket: number) => {
	try {
		await client.query('BEGIN;')
		await client.query(
			'INSERT INTO user_ticket (id_user, id_ticket) VALUES ($1, $2);',
			[idUser, idTicket]
		)
		await ticketService.updateTicket({ id: idTicket, state: true })
		const priceTicket = await client.query(
			'SELECT price FROM tickets WHERE id_ticket=$1',
			[idTicket]
		)
		const balance = await client.query(
			'SELECT balance FROM creditcard WHERE id_user=$1',
			[idUser]
		)
		const newBalance = balance.rows[0] - priceTicket.rows[0]
		await creditCardService.updateCreditCard({ balance: newBalance }, idUser)
		return await client.query('COMMIT;')
	} catch (error) {
		await client.query('ROLLBACK;')
		console.error(`Some wrong in postSale service: ${error}`)
		throw error
	}
}

const postRefund = async (idUser: number, idTicket: number) => {
	try {
		await client.query('BEGIN;')
		await client.query(
			'DELETE FROM user_ticket WHERE id_user=$1 and id_ticket=$2',
			[idUser, idTicket]
		)
		const priceTicket = await client.query(
			'SELECT price FROM tickets WHERE id_ticket=$1',
			[idTicket]
		)
		const balance = await client.query(
			'SELECT balance FROM creditcard WHERE id_user=$1',
			[idUser]
		)
		const newBalance = priceTicket.rows[0] + balance.rows[0]
		await creditCardService.updateCreditCard({ balance: newBalance }, idUser)
		await ticketService.updateTicket({ id: idTicket, state: false })
		return await client.query('COMMIT;')
	} catch (error) {
		await client.query('ROLLBACK;')
		console.error(`Some wrong in postRefund service: ${error}`)
		throw error
	}
}

export = {
	postSale,
	postRefund,
}
