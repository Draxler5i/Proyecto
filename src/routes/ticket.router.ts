import { Router } from "express";

const ticketServices = require('./services/ticketServices')

const router = Router()

router
    .get('/tickets', ticketServices.getTicket)
    .post('/tickets', ticketServices.postTicket)
    .put('/tickets/:id', ticketServices.putTicket)
    .delete('/tickets/:id', ticketServices.deleteTicket)
export = router