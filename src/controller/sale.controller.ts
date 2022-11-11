import saleService from "../services/sale.service"
import ticketServices from "../services/ticket.services"

const TICKET_ALLOWED = 10

const ticketSale = async (req: any, res: any) => {
    const { idUser, idTicket } = req.body
    if (!idUser || !idTicket) {
        res.status(400).send({
            status: 'FAILED', data: { error: 'Id is missing' }
        })
    }
    try {
        const ticketByUser = await ticketServices.getTicketByUserID(idUser)
        if (ticketByUser >= TICKET_ALLOWED) {
            res.status(400).send({
                status: 'FAILED', data: { error: 'Exceeded number of ticket can you put charge' }
            })
        }
        const saleTicket = await saleService.postSell(req.body.idUser, req.body.idTicket)
        res.status(201).send({
            status: 'SUCESS',
            data: saleTicket,
        })
    } catch (error) {
        console.log(`Something go wrong in the sale controller ${error}`);
        res.send({ status: 'Failed', data: { error } })
    }

}

export = {
    ticketSale
}