const { Router } = require('express')
const router = Router()

const services = require('../services/service')

router
    .get('/users', services.getUsers)
    .post('/users', services.createUser)
    .put('/users/:id', services.updateUser)
    .delete('/users/:id', services.deleteUse)

module.exports = router