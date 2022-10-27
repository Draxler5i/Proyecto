import userController from '../controller/user.controller'
import { Router } from 'express'

const router = Router()

router
    .get('/', userController.getAllUsers)
    .get('/:id', userController.getUser)
    .post('/', userController.postNewUser)
    .put('/:id', userController.updateUser)
    .delete('/:id', userController.deleteUser)

export = router