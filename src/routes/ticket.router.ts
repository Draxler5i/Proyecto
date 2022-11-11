import { Router } from "express";
import ticketController from "../controller/ticket.controller";

const router = Router()

router
    .get('/tickets', ticketController.getTickets)
    .post('/tickets', ticketController.postTicketController)
    .put('/tickets/:id', ticketController.updateTicket)
    .delete('/tickets/:id', ticketController.deleteTicketController)
export = router