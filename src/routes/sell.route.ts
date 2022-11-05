const sellService = require('../services/sell.service')
const { Router } = require('express')

const route = Router()

route
    .get('/', sellService.getSells)
    .post('/', sellService.createSell)
    .delete('/ret/:id', sellService.returnSell)
// .delete('/refund', sellService.deleteSell)

export = route