const sellService = require('../services/sell.service')
const { Router } = require('express')

const route = Router()

route
    .post('/', sellService.createSell)
//.delete('/refund', sellService.refund)
// .delete('/refund', sellService.deleteSell)

export = route