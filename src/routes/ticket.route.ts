const ticketService = require('../services/ticket.service')
const { Router } = require('express')

const route = Router()

route
    .get('/', ticketService.getTicket)
    .post('/', ticketService.createTicket)
    .put('/:id', ticketService.createTicket)
// .delete('/refund/:id', ticketService.refund)

export = route