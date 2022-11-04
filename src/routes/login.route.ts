const loginService = require('../services/login.service')
const { Router } = require('express')

const route = Router()

route
    .get('/', loginService.home)
    .post('/', loginService.login)
    .post('/:id', loginService.welcome)

export = route