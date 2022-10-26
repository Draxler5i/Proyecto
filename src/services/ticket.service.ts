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


const postTickets = async (tickets: { category: string, stadio: string, matchDate: Date, price: number }) => {
    try {
        const res = await client.query(
            "INSERT INTO tickets (category) VALUES ($1)",
            [tickets.category]
        );
        return res;
    } catch (error) {
        throw error
    };
}

const updateTickets = async (tickets: { category: string, stadio: string, matchDate: Date, id: number }) => {
    try {
        const res = await client.query(
            "UPDATE tickets SET category=$1,stadio=$2, match_date=$3  WHERE id_tickets=$4",
            [tickets.stadio, tickets.stadio, tickets.matchDate, tickets.id]
        );
        return res
    } catch (error) {
        throw error
    };
}

const deleteTickets = async (id: number) => {
    try {
        const res = client.query(
            "DELETE FROM tickets WHERE id= $1",
            id
        );
        return res
    } catch (error) {
        throw error
    };
}

module.exports = {
    getTickets,
    postTickets,
    updateTickets,
    deleteTickets,
}

