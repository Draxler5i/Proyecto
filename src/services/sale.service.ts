import client from '../database/conection'
import ticketService from './ticket.service'

const postSale = async (idUser:number, idTicket:number) => {
    try {
        const res = await client.query(
            'INSERT INTO user_ticket (id_user, id_ticket) VALUES ($1, $2);',
            [idUser, idTicket]
        )
        await ticketService.updateTickets({id:idTicket, state:true})
        return res
    } catch (error) {
        console.error(`Some wrong in postSale service: ${error}`)
        throw error
    }
}

export = {
    postSale
}