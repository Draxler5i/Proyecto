import authController from '../controller/auth.controller'
import { Router } from 'express'

const router = Router()

router
    .post('/login', authController.login)
    .post('/register', authController.register)

export = router