import userController from '../controller/user.controller'
import { Router } from 'express'

const router = Router()

router
	.get('/', userController.getAllUsers)
	.get('/:id', userController.getUser)
	.put('/:id', userController.updateUser)
	.delete('/:id', userController.deleteUser)

export = router
