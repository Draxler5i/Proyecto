import client from '../database/conection'

const getTickets = async () => {
	try {
		const tickets = await client.query('SELECT * FROM tickets;')
		return tickets.rows
	} catch (error) {
		console.error(`Some wrong in getTickets service: ${error}`)
		throw error
	}
}

const getOneTicketById = async (id: number) => {
	try {
		const ticket = await client.query(
			'SELECT * FROM tickets WHERE id_ticket=$1;',
			[id]
		)
		return ticket.rows
	} catch (error) {
		console.error(`Some wrong in getOneTicket service: ${error}`)
		throw error
	}
}

const postTicket = async (ticket: {
	price: number
	currency: string
	matchDay: Date
	created: Date
	state: boolean
	idStadium: number
}) => {
	try {
		const ticketPosted = await client.query(
			'INSERT INTO tickets (price, currency, match_day, created, state, id_stadium) VALUES ($1, $2, $3, $4, $5, $6)',
			[
				ticket.price,
				ticket.currency,
				ticket.matchDay,
				ticket.created,
				false,
				ticket.idStadium,
			]
		)
		return ticketPosted
	} catch (error) {
		console.error(`Some wrong in postTIckets service: ${error}`)
		throw error
	}
}

const updateTicketById = async (ticket: {
	price?: number
	currency?: string
	matchDay?: Date
	id: number
	idStadium?: number
	state?: boolean
}) => {
	try {
		const ticketUpdated = await client.query(
			'UPDATE tickets SET price=$1, currency=$2, match_day=$3, id_stadium=$4, state=$5 WHERE id_ticket=$6',
			[
				ticket.price,
				ticket.currency,
				ticket.matchDay,
				ticket.idStadium,
				ticket.state,
				ticket.id,
			]
		)
		return ticketUpdated
	} catch (error) {
		console.error(`Some wrong in updateTickets service: ${error}`)
		throw error
	}
}

const updateTicketState = async (ticket: { id: number; state: boolean }) => {
	try {
		const ticketUpdated = await client.query(
			'UPDATE tickets SET state=$1 WHERE id_ticket=$2',
			[ticket.state, ticket.id]
		)
		return ticketUpdated
	} catch (error) {
		console.error(`Some wrong in updateTicketState service: ${error}`)
		throw error
	}
}

const deleteTicketById = async (id: number) => {
	try {
		const ticketDeleted = client.query(
			'DELETE FROM tickets WHERE id_ticket=$1',
			[id]
		)
		return await ticketDeleted
	} catch (error) {
		console.error(`Some wrong in deleteTickets service: ${error}`)
		throw error
	}
}

const getAmountTicketsAvailable = async () => {
	try {
		const ticketsAvailable = await client.query(
			'SELECT  count(state) FROM tickets WHERE state=false;'
		)
		return Number(ticketsAvailable.rows[0].count)
	} catch (error) {
		console.error(`Some wrong in getTicketsAvailable service: ${error}`)
		throw error
	}
}

export = {
	getTickets,
	getOneTicketById,
	postTicket,
	updateTicketById,
	deleteTicketById,
	getAmountTicketsAvailable,
	updateTicketState,
}
