import saleController from "../controller/sale.controller";
import { Router } from "express";

const router = Router()

router
    .post('./saleTicket/:id', saleController.ticketSale)
export = router

