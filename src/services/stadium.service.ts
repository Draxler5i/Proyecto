import client from '../database/conection'
import saleService from './sale.service'

const deleteStadiumById = async (idStadium: number) => {
	try {
		await client.query('BEGIN;')
		const idTickets = await getIdTicketsByIdStadium(idStadium)
		const idUserTicketSaled = await getIdUsersByIdTickets(idTickets.rows)
		for (let i = 0; i < idUserTicketSaled.length; i++) {
			await saleService.postRefund(
				idUserTicketSaled[i].id_user,
				idUserTicketSaled[i].id_ticket
			)
		}

		for (let i = 0; i < idUserTicketSaled.length; i++) {
			await client.query('DELETE FROM tickets WHERE id_ticket = $1', [
				idUserTicketSaled[i].id_ticket,
			])
		}
		await client.query('DELETE FROM stadiums WHERE id_stadium=$1', [
			idStadium,
		])

		return await client.query('COMMIT;')
	} catch (error) {
		await client.query('ROLLBACK;')
		console.error(`Some wrong in postRefund service: ${error}`)
		throw error
	}
}

const getIdTicketsByIdStadium = async (idStadium: number) => {
	return await client.query(
		'SELECT id_ticket FROM tickets WHERE id_stadium = $1',
		[idStadium]
	)
}

const getIdUsersByIdTickets = async (idTickets: any[]) => {
	const idUserTicketSaled: any[] = []

	for (let i = 0; i < idTickets.length; i++) {
		const idUser = await client.query(
			'SELECT id_user FROM user_ticket WHERE id_ticket = $1',
			[idTickets[i].id_ticket]
		)
		idUserTicketSaled.push({
			id_user: idUser.rows[0].id_user,
			id_ticket: idTickets[i].id_ticket,
		})
	}
	return idUserTicketSaled
}

export = {
	deleteStadiumById,
}
