import saleController from '../controller/sale.controller'
import { Router } from 'express'

const router = Router()

router
	.post('/', saleController.ticketSale)
	.post('/refund', saleController.ticketRefund)

export = router
