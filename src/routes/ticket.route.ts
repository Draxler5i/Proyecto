const ticketService = require('../services/ticket.service')
const { Router } = require('express')

const route = Router()

route
    .get('/', ticketService.getTicket)
    .post('/', ticketService.createTicket)
    .put('/:id', ticketService.updateTicket)
    .delete('/:id', ticketService.deleteTicket)

export = route