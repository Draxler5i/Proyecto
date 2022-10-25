import { Router } from 'express'
import userController from '../controllers/user.controller'
const router = Router()

router
    .get('/users', userController.getAllUsers)
    .post('/users', userController.postNewUser)
    .put('/:key/:value', userController.findUser, userController.updateUser)
    .delete('/:key/:value', userController.findUser, userController.deleteUser)


export = router