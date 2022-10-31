import ticketService from '../services/ticket.service'
import validateTicket from '../validations/ticket.validation'

const getAllTickets = async (req: any, res: any) => {
    try {
        const data = await ticketService.getTickets()
        res.send({ status: "OK", data })
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

const getTicket = async (req:any, res:any) => {
    const id = parseInt(req.params.id)
    if(!id){
        res.status(400).send({
            status: "FAILED",
            data:{
                error: "The ID is missing or is empty"
            }
        })
    }
    try {
      const data = await ticketService.getOneTicket(id)
      res.send({ status: "OK", data });
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

const postNewTicket = async (req: any, res: any) => {
    const { price, currency, matchDay, idStadium } = req.body
    if(!price || !currency || !matchDay || !idStadium){
        res.status(400).send({
            status: "FAILED",
            data:{
                error: "Some attributes are missing or are empty"
            }
        })
    }
    req.body.matchDay = new Date(matchDay)
    req.body.created = new Date(Date.now())
    try {
        await validateTicket.validate(req.body)
        const data = await ticketService.postTickets(req.body)
        res.status(201).send({status: "OK", data:data.command, message:`Ticket created`})
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

const updateTicket = async (req: any, res: any) => {
    const id = parseInt(req.params.id)
    if(!id){
        res.status(400).send({
            status: "FAILED",
            data:{
                error: "The ID is missing or is empty"
            }
        })
    }
    req.body.id = id
    try {
        const data = await ticketService.updateTickets(req.body)
        res.status(200).send({status:"OK", data:data.command, message:`Ticket updated with ID:${id}`})
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

const deleteTicket = async (req: any, res: any) => {
    const id = parseInt(req.params.id)
    if(!id){
        res.status(400).send({
            status: "FAILED",
            data:{
                error: "The ID is missing or is empty"
            }
        })
    }
    try {
        const data = await ticketService.deleteTickets(id)
        res.status(200).send({status:"OK", data:data.command, message:`Ticket deleted with ID:${id}`})
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

export = {
    getAllTickets,
    getTicket,
    postNewTicket,
    updateTicket,
    deleteTicket,
}