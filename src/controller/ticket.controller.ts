const ticketService = require('../services/ticket.service');

const getAllTickets = async (req: any, res: any) => {
    try {
        const data = await ticketService.getAllTickets();
        res.send({ status: "OK", data });
    } catch (error) {
        res.send({ stats: "FAILED", data: { error } });
    };
}

const getTicketByUser = async (req: any, res: any) => {

    const idUser = parseInt(req.params.user_id);
    if (!idUser) {
        res.status(400).send({ status: "FAILED", data: { error: "This Ticket is not assignaded to a User" } })
    }
    try {
        const data = await ticketService.getTicketByUserById(idUser);
        res.status(201).send({ status: "FAILED", data })
    } catch (error) {

    }
}

const postNewTicket = async (req: any, res: any) => {
    const { category, stadio, matchDate, price } = req.body
    if (!category && !stadio && !matchDate && !price) {
        res.status(400).send({ status: "FAILED", data: { error: "Is missing one date" } });
    }
    try {
        const data = await ticketService.postTickets(req.body)
        res.status(201).send({ status: "OK", data: data.command, message: `Ticketd created` })
    } catch (error) {
        res.send({ status: "FAILED", data: { error } });
    };
}

const updateTicket = async (req: any, res: any) => {
    const id = parseInt(req.params.id)
    const { category, stadio, matchDate } = req.body
    if (!category && !stadio && !matchDate) {
        res.status(400).send({ status: "FAILED", data: { error: "Requiere all dates" } });
    }
    try {
        const data = await ticketService.updateTickets(id);
        res.status(200).send({ status: "OK", data: data.command, message: "Ticket Uptadte" })
    } catch (error) {
        res.send({ status: "FAILED", data: { error } })
    }
}

const deleteTicket = async (req: any, res: any) => {
    const id = parseInt(req.params.id);
    try {
        const data = await ticketService.deleteTickets(id)
        res.status(200).send({ status: "OK", data: data.command, message: `User deleted with ID:${id}` })
    } catch (error) {
        res.send({ status: "FAILED", data: { error } })
    }
}