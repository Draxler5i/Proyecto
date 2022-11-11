const pool = require('../database/connection')
import creditCardService from "./creditCard.service";

const getTicket = async () => {
    try {
        return await pool.query('SELECT * FROM tickets')
    } catch (error) {
        console.log(`something go wrong get tickets Service ${error}`);
        throw (error)
    }
}

const getTicketByID = async (idTicket: number) => {
    try {
        return await pool.query('SELECT * FROM tickets WHERE id_tickets=$1', [idTicket])
    } catch (error) {
        console.log(`something go wrong get ticket by id Service ${error}`);
        throw error
    }
}

const putTicket = async (ticket: {
    price?: number,
    category?: string,
    match_date?: Date,
    stadio?: string

}, id: number) => {
    try {
        const updateTicket = await pool.query
            ('UPDATE ticket SET price=?, category=?, match_date=?, stadio=? WHERE ticket_id = ?',
                [
                    ticket.price,
                    ticket.category,
                    ticket.match_date,
                    ticket.stadio,
                    id,
                ]
            )
        return updateTicket
    } catch (error) {
        console.log(`something go wrong update the ticket service ${error}`);
        throw (error)
    }
}

const getTicketByUserID = async (id: number) => {
    try {
        const ticketOwned = await pool.query(
            'SELECT count(*) FROM tickets WHERE id_users = $1', [id]
        )
        return Number(ticketOwned.rows[0].count)
    } catch (error) {
        console.log(`something go wrong getTicketUser the ticket  service ${error}`);
        throw (error)
    }
}

const postTicket = async (ticket: {
    price: number,
    category: string,
    match_date: Date,
    idUser: number,
}) => {
    try {
        const postTicket = await pool.query
            ('INSERT INTO tickets (precio, categoria, match_date,id_users ) values($1,$2,$3,$4) RETURNING id_tickets',
                [
                    ticket.price,
                    ticket.category,
                    ticket.match_date,
                    ticket.idUser,
                ]
            )
        return postTicket
    } catch (error) {
        console.log(`something go wrong post the ticket Service ${error}`);
        throw (error)
    }
}

const deleteTicket = async (id: number) => {
    try {
        const ticket = await getTicketByID(id)
        const creditCard = await creditCardService.getCreditCard(ticket.rows[0].id_users)
        const acredit = ticket.rows[0].precio + creditCard.rows[0].balance
        await creditCardService.saveBalance(acredit, ticket.rows[0].id_users)

        return await pool.query('DELETE FROM tickets WHERE id_tickets =$1', [id])
    } catch (error) {
        console.log(`Something go wrong delete ticket service ${error}`);
        throw (error)
    }
}

export = {
    getTicket,
    putTicket,
    postTicket,
    deleteTicket,
    getTicketByUserID,
}