import Express from 'express'
import User from '../models/User'
import Ticket from '../models/Ticket'

const getAllTickets = async (req:Express.Request, res:Express.Response) => {
    try {
        const data = await Ticket.find()
        if (data.length){
            return res.status(200).send({ status: "OK", data })
        } 
        return res.status(204).send({message: 'NO CONTENT'})
    }
    catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

const postNewTicket = async (req:Express.Request, res:Express.Response) => {
    const { price, currency, match_day, stadium_id, stadium_name, seat, user_id } = req.body
    if(!price || !currency || !match_day || !stadium_name){
        return res.status(400).send({
            status: "FAILED",
            data:{
                error: "Some atributes are missing or are empty"
            }
        })
    }
    try {
        const user:any = await User.findById(user_id)
        const newTicket = new Ticket({price, currency, match_day, stadium_id, stadium_name, seat, user_id: user.id
        })
        const datatoSave = await newTicket.save()
        user.ticket_id = user.ticket_id.concat(datatoSave._id)
        user.balance = user.balance - price
        await user.save()
        return res.status(201).send({status: "OK", message:`Ticket created`})
    }
    catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

const updateTicket = async (req:Express.Request, res:Express.Response) => {
    const { id } = req.params
    if(!id){
        return res.status(400).send({
            status: "FAILED",
            data:{
                error: "ID is missing or is empty"
            }
        })
    }
    try {
        const data = await Ticket.updateOne({ _id:id }, { $set: req.body})
        return res.status(200).send({status:"OK", data, message:`Ticket updated with ID:${id}`})
    } 
    catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

const deleteTicket = async (req:Express.Request, res:Express.Response) => {
    const { id } = req.params
    if(!id){
        return res.status(400).send({
            status: "FAILED",
            data:{
                error: "ID is missing or is empty"
            }
        })
    }
    try {
        const ticket:any = await Ticket.findById(id)
        const { price,  user_id } = ticket
        const user:any = await User.findById(user_id)
        user.balance = user.balance + price
        for( let i = 0; i < user.ticket_id.length; i++){
            if ( user.ticket_id[i]._id.valueOf() == id) { 
                user.ticket_id.splice(i, 1)
            }
        }
        await user.save()
        const data = await Ticket.deleteOne({_id: id})
        return res.status(200).send({status:"OK", data, message:`Ticket deleted with ID:${id}`})
    } 
    catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

export = {
    getAllTickets,
    postNewTicket,
    updateTicket,
    deleteTicket,
}