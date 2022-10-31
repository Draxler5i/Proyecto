import client from '../database/conection'
import ticketService from './ticket.service'

const postSale = async (idUser:number, idTicket:number) => {
    try {
        const res = await client.query(
            'INSERT INTO user_ticket (id_user, id_ticket) VALUES ($1, $2);',
            [idUser, idTicket]
        )
        const res2 = await ticketService.updateState(true, idTicket)
        return res2
    } catch (error) {
        throw error;
    };
}

export = {
    postSale
}