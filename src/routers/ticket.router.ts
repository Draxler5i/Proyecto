import { Router } from 'express'
import ticketController from '../controllers/ticket.controller'
import { authorization } from '../services/authorization.service'
const router = Router()

router
    .get('/', ticketController.getAllTickets)
    .post('/', authorization, ticketController.postNewTicket)
    .put('/:id', ticketController.updateTicket)
    .delete('/:id', authorization, ticketController.deleteTicket)

export = router