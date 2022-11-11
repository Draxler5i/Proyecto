const pool = require('../database/connection')

const getTicket = async () => {
    try {
        return await pool.query('SELECT * FROM ticket')
    } catch (error) {
        console.log(`something go wrong get ticketService ${error}`);
        throw (error)
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
            'SELECT count(*) FROM tickets WHERE id_user = ?', id
        )
        return ticketOwned
    } catch (error) {
        console.log(`something go wrong getTicketUser the ticket  service ${error}`);
        throw (error)
    }
}

const postTicket = async (ticket: {
    price: number,
    category: string,
    match_date: Date,
    stadio: string
    idStadium: number
}) => {
    try {
        const postTicket = await pool.query
            ('INSERT INTO ticket (price, category, match_date, stadio) values(?,?,?,?)',
                [
                    ticket.price,
                    ticket.category,
                    ticket.match_date,
                    ticket.stadio,
                    ticket.idStadium
                ]
            )
        return postTicket
    } catch (error) {
        console.log(`something go wrong post the ticket ${error}`);
        throw (error)
    }
}

const deleteTicket = async (id: number) => {
    try {
        return await pool.query('DELETE FROM ticket WHERE ticket_id =?', id)
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