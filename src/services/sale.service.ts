import creditCardService from "./creditCard.service";
import ticketServices from "./ticket.services";
import pool from "../database/connection";

const postSell = async (ticket: {
    price: number,
    category: string,
    match_date: Date,
    idUser: number,
}) => {
    try {
        await pool.query('BEGIN')
        const creditCard = await creditCardService.getCreditCard(ticket.idUser)
        if (ticket.price <= creditCard.rows[0].balance) {
            const debit = creditCard.rows[0].balance - ticket.price
            const ticketPost = await ticketServices.postTicket(ticket)
            await creditCardService.saveBalance(debit, ticket.idUser)
            await pool.query('SELECT precio FROM tickets WHERE id_tickets=$1', [ticketPost.rows[0].id_tickets])
        }
        return await pool.query('COMMIT')
    } catch (error) {
        await pool.query('ROLLBACK')
        console.error(`Something go wrong with the sale service: ${error}`)
        throw error
    }
}



export = {
    postSell,
}