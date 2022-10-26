import { Router } from 'express'
import userController from '../controllers/user.controller'
const router = Router()

router
    .get('/', userController.getAllUsers)
    .post('/', userController.postNewUser)
    .put('/:id', userController.updateUser)
    .delete('/:id', userController.deleteUser)


export = router