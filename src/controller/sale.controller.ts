import { Request, Response } from 'express'
import saleService from '../services/sale.service'
import userService from '../services/user.service'
import validateCreditCard from '../validations/creditCard.calidation'

const sellTicket = async (req:Request, res:Response) => {
    const { idUser, idTicket } = req.body
    if(!idUser || !idTicket){
        res.status(400).send({
            status: "FAILED", data:{ error: "Some attributes are missing or are empty" }
        })
    }
    try {
        const creditCard = await userService.getCreditCard(idUser)
        await validateCreditCard.validate(creditCard)
        const data = await saleService.postSale(req.body.idUser, req.body.idTicket)
        res.status(201).send({status: "OK", data, message:`Ticket sold`})
    } catch (error) {
        console.error(`Some wrong in sellTicket controller: ${error}`)
        res.send({ status:"FAILED", data: { error }})
    }
}

export = {
    sellTicket
}