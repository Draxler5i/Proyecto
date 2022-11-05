const userService = require('../services/user.service')
const { Router } = require('express')

const route = Router()

route
    .get('/', userService.getUsers)
    .post('/', userService.createUser)
    .put('/:id', userService.updateUser)
    .delete('/:id', userService.deleteUser)

export = route