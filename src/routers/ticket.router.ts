import { Router } from 'express'
import ticketController from '../controllers/ticket.controller'
const router = Router()

router
    .get('/', ticketController.getAllTickets)
    .post('/', ticketController.postNewTicket)
    .put('/:id', ticketController.updateTicket)
    .delete('/:id', ticketController.deleteTicket)

export = router