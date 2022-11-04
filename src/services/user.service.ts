import client from '../database/conection'
import creditCardService from './creditCard.service'

const getUsers = async () => {
	try {
		const users = await client.query('SELECT * FROM users;')
		return users.rows
	} catch (error) {
		console.error(`Some wrong in getUsers service: ${error}`)
		throw error
	}
}

const getOneUser = async (id: number) => {
	try {
		const user = await client.query('SELECT * FROM users WHERE id_user=$1;', [
			id,
		])
		return user.rows
	} catch (error) {
		console.error(`Some wrong in getOneUser service: ${error}`)
		throw error
	}
}

const postUser = async (
	user: {
		name: string
		age: number
		email: string
		password: string
		birthday: Date
		created: Date
		lastname: string
	},
	card: {
		nameCard: string
		expiration: Date
		created: Date
		balance: number
		cvv: number
		cardNumber: string
	}
) => {
	try {
		await client.query('BEGIN;')
		const userPosted = await client.query(
			'INSERT INTO users (name_user, age, email, password, birthday, created, lastname) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_user;',
			[
				user.name,
				user.age,
				user.email,
				user.password,
				user.birthday,
				user.created,
				user.lastname,
			]
		)
		await creditCardService.postCreditCard(card, userPosted.rows[0].id_user)
		return await client.query('COMMIT;')
	} catch (error) {
		await client.query('ROLLBACK;')
		console.error(`Some wrong in postUsers service: ${error}`)
		throw error
	}
}

const updateUser = async (user: {
	name?: string
	age?: number
	email?: string
	password?: string
	birthday?: Date
	lastname?: string
	id: number
}) => {
	try {
		const userUpdated = await client.query(
			'UPDATE users SET name_user=$1, age=$2, email=$3, password=$4, birthday=$5, lastname=$6 WHERE id_user=$7;',
			[
				user.name,
				user.age,
				user.email,
				user.password,
				user.birthday,
				user.lastname,
				user.id,
			]
		)
		return userUpdated
	} catch (error) {
		console.error(`Some wrong in updateUsers service: ${error}`)
		throw error
	}
}

const deleteUser = async (id: number) => {
	try {
		const userDeleted = await client.query(
			'DELETE FROM users WHERE id_user = $1;',
			[id]
		)
		return userDeleted
	} catch (error) {
		console.error(`Some wrong in deleteUsers service: ${error}`)
		throw error
	}
}

const existUser = async (email: string) => {
	try {
		const user = await client.query('SELECT * FROM users WHERE email = $1;', [
			email,
		])
		return user.rows
	} catch (error) {
		console.error(`Some wrong in existUser service: ${error}`)
		throw error
	}
}

const getTicketsPurchased = async (idUser: number) => {
	try {
		const ticketsPurchased = await client.query(
			'SELEC count(*) FROM user_ticket WHERE id_user=$1;',
			[idUser]
		)
		return ticketsPurchased.rows[0]
	} catch (error) {
		console.error(`Some wrong in getTIcketsPurchased service: ${error}`)
		throw error
	}
}

export = {
	getUsers,
	getOneUser,
	postUser,
	updateUser,
	deleteUser,
	existUser,
	getTicketsPurchased,
}
