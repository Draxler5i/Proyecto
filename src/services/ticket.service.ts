import client from '../database/conection'

const getTickets = async () => {
    try {
        const res = await client.query(
            'SELECT * FROM tickets;'
        )
        return res.rows
    } catch (error) {
        console.error(`Some wrong in getTickets service: ${error}`)
        throw error
    }
}

const getOneTicket = async (id:number) => {
    try {
        const res = await client.query(
            "SELECT * FROM tickets WHERE id_ticket=$1;",
            [id]
        )
        return res.rows
    } catch (error) {
        console.error(`Some wrong in getOneTicket service: ${error}`)
        throw error
    }
}

const postTickets = async (ticket: { price: number, currency: string, matchDay: Date, created:Date, state:boolean, idStadium:number }) => {
    try {
        const res = await client.query(
            "INSERT INTO tickets (price, currency, match_day, created, state, id_stadium) VALUES ($1, $2, $3, $4, $5, $6)",
            [ticket.price, ticket.currency, ticket.matchDay, ticket.created, false, ticket.idStadium]
        )
        return res
    } catch (error) {
        console.error(`Some wrong in postTIckets service: ${error}`)
        throw error
    }
}

const updateTickets = async (ticket: {price?: number, currency?: string, matchDay?: Date, id: number, idStadium?:number, state?:boolean}) => {
    try {
        const res = await client.query(
            "UPDATE tickets SET price=$1, currency=$2, match_day=$3, id_stadium=$4, state=$5 WHERE id_ticket=$6",
            [ticket.price, ticket.currency, ticket.matchDay, ticket.idStadium, ticket.state, ticket.id]
        )
        return res
    } catch (error) {
        console.error(`Some wrong in updateTickets service: ${error}`)
        throw error
    }
}

const deleteTickets = async (id: number) => {
    try {
        const res = client.query(
            "DELETE FROM tickets WHERE id_ticket=$1",
            [id]
        )
        return res
    } catch (error) {
        console.error(`Some wrong in deleteTickets service: ${error}`)
        throw error
    }
}

const getTicketsAvailable = async () => {
    try {
        const res = await client.query(
            "SELECT  count(state) FROM tickets WHERE state=false;"
        )
        return res.rows[0]
    } catch (error) {
        console.error(`Some wrong in getTicketsAvailable service: ${error}`)
        throw error
    }
}

export = {
    getTickets,
    getOneTicket,
    postTickets,
    updateTickets,
    deleteTickets,
    getTicketsAvailable
}

