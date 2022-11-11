import userController from '../controller/user.controller'
import { Router } from 'express'

const router = Router()

router
	.get('/', userController.getAllUsers)
	.get('/:id', userController.getUserById)
	.put('/:id', userController.updateUserById)
	.delete('/:id', userController.deleteUserById)

export = router
