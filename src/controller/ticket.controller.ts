import ticketService from '../services/ticket.service'
import validateTicket from '../validations/ticket.validation'

const MESSAGE_ERROR = {
	status: 'FAILED',
	data: { error: 'The ID is missing or is empty' },
}

const getAllTickets = async (req: any, res: any) => {
	try {
		const tickets = await ticketService.getTickets()
		res.status(200).send({ status: 'OK', data: tickets })
	} catch (error) {
		console.error(`Some wrong in getAllTickets controller: ${error}`)
		res.send({ status: 'FAILED', data: { error } })
	}
}

const getTicketById = async (req: any, res: any) => {
	const id = parseInt(req.params.id)
	if (!id) res.status(400).send(MESSAGE_ERROR)
	try {
		const ticket = await ticketService.getOneTicketById(id)
		res.status(200).send({ status: 'OK', data: ticket })
	} catch (error) {
		console.error(`Some wrong in getTicket controller: ${error}`)
		res.send({ status: 'FAILED', data: { error } })
	}
}

const postNewTicket = async (req: any, res: any) => {
	const { matchDay } = req.body
	try {
		await validateTicket.validate(req.body)
		req.body.matchDay = new Date(matchDay)
		req.body.created = new Date(Date.now())
		const ticketPosted = await ticketService.postTicket(req.body)
		res.status(201).send({
			status: 'OK',
			data: ticketPosted,
			message: 'Ticket created',
		})
	} catch (error) {
		console.error(`Some wrong in postNewTicket controller: ${error}`)
		res.send({ status: 'FAILED', data: { error } })
	}
}

const updateTicketById = async (req: any, res: any) => {
	const id = parseInt(req.params.id)
	if (!id) res.status(400).send(MESSAGE_ERROR)
	req.body.id = id
	try {
		const ticketUpdated = await ticketService.updateTicketById(req.body)
		res.status(200).send({
			status: 'OK',
			data: ticketUpdated,
			message: `Ticket updated with ID:${id}`,
		})
	} catch (error) {
		console.error(`Some wrong in updateTicket controller: ${error}`)
		res.send({ status: 'FAILED', data: { error } })
	}
}

const deleteTicketById = async (req: any, res: any) => {
	const id = parseInt(req.params.id)
	if (!id) res.status(400).send(MESSAGE_ERROR)
	try {
		const ticketDeleted = await ticketService.deleteTicketById(id)
		res.status(200).send({
			status: 'OK',
			data: ticketDeleted,
			message: `Ticket deleted with ID:${id}`,
		})
	} catch (error) {
		console.error(`Some wrong in deleteTicket controller: ${error}`)
		res.send({ status: 'FAILED', data: { error } })
	}
}

export = {
	getAllTickets,
	getTicketById,
	postNewTicket,
	updateTicketById,
	deleteTicketById,
}
