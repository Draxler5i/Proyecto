import { Router } from 'express'
import ticketController from '../controller/ticket.controller'

const router = Router()

router
	.get('/', ticketController.getAllTickets)
	.get('/:id', ticketController.getAllTickets)
	.post('/', ticketController.postNewTicket)
	.put('/:id', ticketController.updateTicketById)
	.delete('/:id', ticketController.deleteTicketById)

export = router
