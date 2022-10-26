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
    const { price, category, match_date, stadio, user_id } = req.body
    if(!price || !category || !match_date || !stadio || !user_id){
        res.status(400).send({
            status: "FAILED",
            data:{
                error: "Some atributes are missing or are empty"
            }
        })
    }
    try {
        const data = await ticketService.postTicket(req.body)
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
                error: "ID is missing or are empty"
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
                error: "ID is missing or are empty"
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