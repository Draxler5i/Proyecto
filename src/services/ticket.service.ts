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

const postTickets = async (ticket: { price: number, currency: string, matchDay: Date, created:Date, state:boolean }) => {
    try {
        const res = await client.query(
            "INSERT INTO tickets (price, currency, match_day, created, state) VALUES ($1, $2, $3, $4, $5)",
            [ticket.price, ticket.currency, ticket.matchDay, ticket.created, false]
        )
        console.log(res)
        return res;
    } catch (error) {
        console.log(error)
        throw error
    };
}

const updateTickets = async (ticket: { price: number, currency: string, matchDay: Date, id: number, idStadium:number, state:boolean}) => {
    try {
        const res = await client.query(
            "UPDATE tickets SET price=$1, currency=$2, match_day=$3, id_stadium=$4, state=$5 WHERE id_ticket=$6",
            [ticket.price, ticket.currency, ticket.matchDay, ticket.idStadium, ticket.state,ticket.id]
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

