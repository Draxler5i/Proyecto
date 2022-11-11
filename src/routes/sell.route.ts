const sellService = require('../services/sell.service')
const { Router } = require('express')

const route = Router()

route
    .get('/', sellService.getSellsDetails)
    .get('/:id', sellService.getSellsDetailsById)
    .get('/balance/:id', sellService.getBalance)
    .post('/', sellService.createSell)
    .delete('/ret/:id', sellService.returnSell)
    .delete('/refund/:id', sellService.returnMoneyUser)

export = route