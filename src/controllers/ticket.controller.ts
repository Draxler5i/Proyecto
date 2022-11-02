import User from '../models/User';
import Ticket from '../models/Ticket'
import ticketService from '../services/ticket.service'

const getAllTickets = async (req:any, res:any) => {
    try {
        const data = await ticketService.getTickets()
        if (data.length) return res.status(200).send({ status: "OK", data });
        return res.status(204).send({message: 'NO CONTENT'})
      } catch (error) {
          res.send({ status:"FAILED", data: { error }})
      }
}

const postNewTicket = async (req:any, res:any) => {
    const { price, currency, match_day, stadium_id, stadium_name, seat, user_id } = req.body
    if(!price || !currency || !match_day || !stadium_name){
        res.status(400).send({
            status: "FAILED",
            data:{
                error: "Some atributes are missing or are empty"
            }
        })
    }
    const user:any = await User.findById(user_id)
    const newTicket = new Ticket({
        price,
        currency,
        match_day,
        stadium_id,
        stadium_name,
        seat,
        user_id: user.id
    })
    try {
        const datatoSave = await newTicket.save()
        user.ticket_id = user.ticket_id.concat(datatoSave._id)
        user.balance = user.balance - price
        await user.save()
        res.status(201).send({status: "OK", message:`Ticket created`})
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

const updateTicket = async (req:any, res:any) => {
    const { id } = req.params
    if(!id){
        res.status(400).send({
            status: "FAILED",
            data:{
                error: "ID is missing or is empty"
            }
        })
    }
    try {
        const data = await ticketService.updateTicket(id, req.body)
        res.status(200).send({status:"OK", data, message:`Ticket updated with ID:${id}`})
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

const deleteTicket = async (req:any, res:any) => {
    const { id } = req.params
    if(!id){
        res.status(400).send({
            status: "FAILED",
            data:{
                error: "ID is missing or is empty"
            }
        })
    }
    try {
        const data = await ticketService.deleteTicket(id)
        res.status(200).send({status:"OK", data, message:`Ticket deleted with ID:${id}`})
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

export = {
    getAllTickets,
    postNewTicket,
    updateTicket,
    deleteTicket,
}