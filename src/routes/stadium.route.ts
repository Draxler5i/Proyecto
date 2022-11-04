const stadiumService = require('../services/stadium.service')
const { Router } = require('express')

const route = Router()

route
    .get('/', stadiumService.getStadiums)
    .post('/', stadiumService.createStadium)
    .put('/:id', stadiumService.updateStadum)
// .delete('/:id', stadiumService.deleteStadium)

export = route