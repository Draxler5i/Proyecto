import { Router } from 'express'
import ticketController from '../controllers/ticket.controller'
const router = Router()

router
    .get('/tickets', ticketController.getAllTickets)
    .post('/tickets', ticketController.postNewTicket)
    .put('/tickets/:id', ticketController.updateTicket)
    .delete('/tickets/:id', ticketController.deleteTicket)

export = router