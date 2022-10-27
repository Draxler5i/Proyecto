import client from '../database/conection'

const getTickets = async () => {
    try {
        const res = await client.query(
            'SELECT * FROM tickets;'
        );
        return res.rows;
    } catch (error) {
        throw error;
    };
}

const getOneTicket = async (id:number) => {
    try {
        const res = await client.query(
            "SELECT * FROM tickets WHERE id_ticket=$1;",
            [id]
        )
        return res.rows
    } catch (error) {
        throw error
    }
}

const postTickets = async (ticket: { price: number, currency: string, matchDay: Date, created:Date, idStadium:number }) => {
    try {
        const res = await client.query(
            "INSERT INTO tickets (price, currency, match_day, created, id_stadium) VALUES ($1, $2, $3, $4, $5)",
            [ticket.price, ticket.currency, ticket.matchDay, ticket.created, ticket.idStadium]
        );
        return res;
    } catch (error) {
        throw error
    };
}

const updateTickets = async (ticket: { price: number, currency: string, matchDay: Date, id: number, idStadium:number}) => {
    try {
        const res = await client.query(
            "UPDATE tickets SET price=$1, currency=$2, match_day=$3, id_stadium=$4 WHERE id_ticket=$5",
            [ticket.price, ticket.currency, ticket.matchDay, ticket.idStadium, ticket.id]
        );
        return res
    } catch (error) {
        throw error
    };
}

const deleteTickets = async (id: number) => {
    try {
        const res = client.query(
            "DELETE FROM tickets WHERE id_ticket=$1",
            [id]
        );
        return res
    } catch (error) {
        throw error
    };
}

export = {
    getTickets,
    getOneTicket,
    postTickets,
    updateTickets,
    deleteTickets,
}

