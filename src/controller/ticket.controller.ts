import ticketService from "../services/ticket.services"

const ID_MISSING ='ID is missing or empty'

const getTickets = async (req: any, res: any) => {
    try {
        const tickets = await ticketService.getTicket
        res.send({ status: 'OK', data: tickets })
    } catch (error) {
        console.log(`Something go wron get all ticket Controller':${error}`);
        res.send({ status: 'FAILED', data: { error } })
    }
}

const postTicketController = async (req: any, res: any) => {
    try {
        const postTicket = await ticketService.postTicket(req.body)
        res.status(201).send({
            status: `SUCEES`,
            data: postTicket
        })
    } catch (error) {
        console.log(`Something go wrong with post ticket contorller ${error} `);
        res.status(400).send({ data: error })
    }
}


const updateTicket = async (req: any, res: any) => {
    const id = parseInt(req.params.id)
    if (!id) {
        res.status(400).send(ID_MISSING)
    }
    try {
        const putTicket = await ticketService.putTicket(req.body, id)
        res.status(200).send({
            status: `SUCCESS`,
            data: putTicket,
        })
    } catch (error) {
        console.log(`Someting go wrong update ticket controller ${error}`);
        res.status(400).send({ data: error })
    }
}

const deleteTicketController = async (req: any, res: any) => {
    const id = parseInt(req.params.id)
    if (!id) {
        res.status(400).send(ID_MISSING)
    }
    try {
        const deleteTicket = await ticketService.deleteTicket(id)
        res.status(200).send({
            status: `SUCCES`,
            data: deleteTicket,
        })
    } catch (error) {
        console.log(`Someting go wrong delete ticket controller ${error} `);
        res.status(400).send({ data: error })
    }
}

export = {
    getTickets,
    postTicketController,
    updateTicket,
    deleteTicketController
}

