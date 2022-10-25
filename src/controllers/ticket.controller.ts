import ticketService from '../services/ticket.service'

const getAllTickets = async (req:any, res:any) => {
    try {
      const data = await ticketService.getTickets()
      res.send({ status: "OK", data });
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

const postNewTicket = async (req:any, res:any) => {
    const { name, age } = req.body
    if(!name){
        res.status(400).send({
            status: "FAILED",
            data:{
                error: "The name is missing or is empty"
            }
        })
    }
    try {
        const data = await ticketService.postTicket(req.body)
        //res.status(201).send({status: "OK", data:data.command, message:`User created`})
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

const updateTicket = async (req:any, res:any) => {
    const id = parseInt(req.params.id)
    console.log(id)
    const { name, age } = req.body
    try {
        const data = await ticketService.updateTicket({id, name, age})
        //res.status(200).send({status:"OK", data:data.command, message:`User updated with ID:${id}`})
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

const deleteTicket = async (req:any, res:any) => {
    const id = parseInt(req.params.id)
    try {
        const data = await ticketService.deleteTicket(id)
        //res.status(200).send({status:"OK", data:data.command, message:`User deleted with ID:${id}`})
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