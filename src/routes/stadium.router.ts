import stadiumController from '../controller/stadium.controller'
import { Router } from 'express'

const router = Router()

router.delete('/:id', stadiumController.deleteStadiumById)
export = router
