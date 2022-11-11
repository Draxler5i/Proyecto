import saleController from "../controller/sale.controller";
import { Router } from "express";

const router = Router()

router
    .post('/saleTicket', saleController.ticketSale)
export = router

