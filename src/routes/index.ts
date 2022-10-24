const { Router } = require('express')
const router = Router()

const userController = require('../controller/user.controller')

router
    .get('/users', userController.getAllUsers)
    .post('/users', userController.postNewUser)
    .put('/users/:id', userController.updateUser)
    .delete('/users/:id', userController.deleteUser)

module.exports = router