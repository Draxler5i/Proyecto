import client from '../database/conection'

const getCreditCardById = async (idUser: number) => {
	try {
		const creditCard = await client.query(
			'SELECT * FROM creditcard WHERE id_user=$1;',
			[idUser]
		)
		return creditCard.rows[0]
	} catch (error) {
		console.error(`Some wrong in getCreditCard service: ${error}`)
		throw error
	}
}

const postCreditCard = async (
	card: {
		name_card: string
		expiration: string
		created: Date
		balance: number
		cvv: number
		number: string
	},
	idUser: number
) => {
	try {
		return await client.query(
			'INSERT INTO creditcard (name_card, expiration, created, balance, cvv, number, id_user) VALUES ($1,$2,$3,$4,$5,$6,$7);',
			[
				card.name_card,
				card.expiration,
				card.created,
				card.balance,
				card.cvv,
				card.number,
				idUser,
			]
		)
	} catch (error) {
		console.error(`Some wrong in getCreditCard service: ${error}`)
		throw error
	}
}

const updateCreditCardById = async (
	card: {
		name_card?: string
		expiration?: string
		balance?: number
		cvv?: number
		number?: string
	},
	id: number
) => {
	try {
		const creditCardUpdated = await client.query(
			'UPDATE creditcard SET name_card=$1, expiration=$2, balance=$3, cvv=$4, number=$5 WHERE id_user=$6',
			[
				card.name_card,
				card.expiration,
				card.balance,
				card.cvv,
				card.number,
				id,
			]
		)
		return creditCardUpdated
	} catch (error) {
		console.error(`Some wrong in updateCreditCard service: ${error}`)
		throw error
	}
}

const updateBalanceCreditCard = async (balance: number, id: number) => {
	try {
		const creditCardUpdated = await client.query(
			'UPDATE creditcard SET balance=$1 WHERE id_user=$2',
			[balance, id]
		)
		return creditCardUpdated
	} catch (error) {
		console.error(`Some wrong in updateCreditCard service: ${error}`)
		throw error
	}
}

const deleteCreditCardById = async (id: number) => {
	try {
		await client.query('BEGIN;')
		await client.query('DELETE FROM creditcard WHERE id_user=$1', [id])
		await client.query('DELETE FROM users WHERE id_user=$1', [id])
		return await client.query('COMMIT;')
	} catch (error) {
		await client.query('ROLLBACK;')
		console.error(`Some wrong in deleteCreditCard service: ${error}`)
		throw error
	}
}

export = {
	updateCreditCardById,
	getCreditCardById,
	deleteCreditCardById,
	postCreditCard,
	updateBalanceCreditCard,
}
