import { Request, Response } from 'express'
import ticketService from '../services/ticket.service'
import validateTicket from '../validations/ticket.validation'

const message = {
    status: "FAILED",
    data:{ error: "The ID is missing or is empty" }
}

const getAllTickets = async (req: Request, res: Response) => {
    try {
        const data = await ticketService.getTickets()
        res.send({ status: "OK", data })
    } catch (error) {
        console.error(`Some wrong in getAllTickets controller: ${error}`)
        res.send({ status:"FAILED", data: { error }})
    }
}

const getTicket = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if(!id) res.status(400).send(message)
    try {
      const data = await ticketService.getOneTicket(id)
      res.send({ status: "OK", data });
    } catch (error) {
        console.error(`Some wrong in getTicket controller: ${error}`)
        res.send({ status:"FAILED", data: { error }})
    }
}

const postNewTicket = async (req: Request, res: Response) => {
    const { matchDay } = req.body
    try {
        await validateTicket.validate(req.body)
        req.body.matchDay = new Date(matchDay)
        req.body.created = new Date(Date.now())
        const data = await ticketService.postTickets(req.body)
        res.status(201).send({status: "OK", data, message:"Ticket created"})
    } catch (error) {
        console.error(`Some wrong in postNewTicket controller: ${error}`)
        res.send({ status:"FAILED", data: { error }})
    }
}

const updateTicket = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if(!id) res.status(400).send(message)
    req.body.id = id
    try {
        const data = await ticketService.updateTickets(req.body)
        res.status(200).send({status:"OK", data, message:`Ticket updated with ID:${id}`})
    } catch (error) {
        console.error(`Some wrong in updateTicket controller: ${error}`)
        res.send({ status:"FAILED", data: { error }})
    }
}

const deleteTicket = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if(!id) res.status(400).send(message)
    try {
        const data = await ticketService.deleteTickets(id)
        res.status(200).send({status:"OK", data, message:`Ticket deleted with ID:${id}`})
    } catch (error) {
        console.error(`Some wrong in deleteTicket controller: ${error}`)
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