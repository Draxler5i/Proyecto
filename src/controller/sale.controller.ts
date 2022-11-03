import saleService from '../services/sale.service'
import validateCreditCard from '../validations/creditCard.validation'
import creditCardService from '../services/creditCard.service'
import userService from '../services/user.service'
import ticketService from '../services/ticket.service'

const message = { status: "FAILED", data:{ error: "Some attributes are missing or are empty" }}

const ticketSale = async (req:any, res:any) => {
    const { idUser, idTicket } = req.body
    if(!idUser || !idTicket) res.status(400).send(message)
    try {
        const amountTicketsPurchased = await userService.getTicketsPurchased(idUser)
        if(amountTicketsPurchased >=10){
            res.status(400).send({
                status: "FAILED", 
                message:"The number of tickets available for purchase by a user has been exceeded"
            })
        }
        const ticketsAvailable = await ticketService.getTicketsAvailable()
        if(ticketsAvailable === 0){
            res.status(400).send({
                status: "FAILED", 
                message:"No tickets available for sale"
            })
        }
        const creditCard = await creditCardService.getCreditCard(idUser)
        await validateCreditCard.validate(creditCard)
        const data = await saleService.postSale(req.body.idUser, req.body.idTicket)
        res.status(201).send({status: "OK", data, message:"Ticket sold"})
    } catch (error) {
        console.error(`Some wrong in ticketSale controller: ${error}`)
        res.send({ status:"FAILED", data: { error }})
    }
}

const ticketRefund = async (req:any, res:any) => {
    const { idUser, idTicket } = req.body
    if(!idUser || !idTicket) res.status(400).send(message)
    try {
        const data = await saleService.postRefund(idUser, idTicket)
        res.status(201).send({status: "OK", data, message:"Refunded Ticket"})
    } catch (error) {
        console.error(`Some wrong in ticketRefund controller: ${error}`)
        throw error
    }
}

export = {
    ticketSale,
    ticketRefund
}