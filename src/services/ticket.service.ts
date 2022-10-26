import Ticket from "../models/Ticket"

const getTickets = async () => {
    try {
        try {
        return await Ticket.find()
        } catch (error) {
            throw error
        }
    } catch (error) {
        throw error
    }
}

const postTicket = async (ticket:any) => {
    try {
        const newTicket = new Ticket(ticket)
        return await newTicket.save() 
    } catch (error) {
        throw error
    }
}

const updateTicket = async (id:string, ticket:any) => {
    try {
        return await Ticket.updateOne({ _id:id }, { $set: ticket})
    } catch (error) {
        throw error
    }
}

const deleteTicket = async (id:string) => {
    try {
        return await Ticket.remove({_id: id})
    } catch (error) {
        throw error
    }
}

export = {
    getTickets, 
    postTicket, 
    updateTicket, 
    deleteTicket,
}