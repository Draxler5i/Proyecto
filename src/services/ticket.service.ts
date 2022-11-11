const { QueryResult } = require(`pg`)
const client = require(`../postgres/connection`)
const errors = require(`./errorMessages/errors`)

const getTicket = async (_req: Express.Request, res: Express.Response) => {
    try {
        const tickets = await client.query(`SELECT * from ticket`)
        return res.status(200).json(tickets.rows)
    } catch (e) {
        console.log(e)
        return res.status(400).send(errors.throw_error(errors.ERROR_GET('tickets')))
    }
}
const getNumberOfTickets = (ticket_id: number, quantity: number): boolean => {
    try {
        const tickets = client.query(`select quantity from ticket where ticket_id=$1`, [ticket_id])
        if (tickets.rows[0].quantity >= quantity) return true
        return false
    } catch (e) {
        console.log(e)
        throw e
    }
}
const createTicket = async (req: Express.Request, res: Express.Response) => {
    const { price, currency, match_day, stadium_id, type, quantity } = req.body
    const CREATE_ERROR = errors.ERROR_MESSAGE('CREATE a ticket')
    if (!price || !currency || !match_day || !stadium_id || !type || !quantity) {
        return res.status(400).send(errors.ERROR_VARIABLE)
    }
    try {
        await client.query(`INSERT INTO ticket ( price, currency, match_day, stadium_id, type, quantity ) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [price, currency, match_day, stadium_id, type, quantity],
            (error: Error, results: typeof QueryResult) => {
                if (error) {
                    return res.status(400).send(CREATE_ERROR)
                }
                return res.status(201).send(`Ticket added with price: ${results.rows[0].price}, 
                currency: ${results.rows[0].currency}, match_day: ${results.rows[0].match_day},
                stadium id: ${results.rows[0].stadium_id}, type: ${results.rows[0].type}, 
                quantity: ${results.rows[0].quantity}`)
            })
    } catch (e) {
        console.log(e)
        return res.status(400).send(errors.throw_error(e))
    }
}
const updateTicket = async (req: Express.Request, res: Express.Response) => {
    const id = parseInt(req.params.id)
    const { price, match_day, quantity } = req.body
    const UPDATE_ERROR = errors.ERROR_MESSAGE('UPDATE a ticket')
    if (!price || !match_day || !quantity) {
        return res.status(400).send(errors.ERROR_VARIABLE)
    }
    try {
        const number_ticket = await client.query(`select * from ticket where ticket_id = $1`, [id])
        if (number_ticket.rowCount == 0) {
            return res.status(400).send(UPDATE_ERROR)
        }
        const ticket = await client.query(`UPDATE ticket SET price = $1, match_day = $2, 
        quantity = $3 WHERE ticket_id = $4 RETURNING *`, [price, match_day, quantity, id])
        return res.status(200).send(`Ticket modified with price: ${ticket.rows[0].price}, 
        match_day: ${ticket.rows[0].match_day}, quantity: ${ticket.rows[0].quantity}`)
    } catch (e) {
        console.log(e)
        return res.status(400).send(errors.throw_error(UPDATE_ERROR))
    }
}
const deleteTicket = async (req: Express.Request, res: Express.Response) => {
    const id = parseInt(req.params.id)
    const DELETE_ERROR = errors.ERROR_MESSAGE('DELETE a ticket')
    try {
        const ticket = await client.query(`select * from ticket where ticket_id = $1`, [id])
        if (ticket.rowCount == 0) {
            return res.status(400).send(DELETE_ERROR)
        }
        await client.query(`DELETE FROM ticket WHERE ticket_id = $1 RETURNING *`, [id])
        return res.status(200).send(`Ticket deleted with ID: ${ticket.rows[0].ticket_id}`)
    } catch (e) {
        console.log(e)
        return res.status(400).send(errors.throw_error(DELETE_ERROR))
    }
}

export = {
    getTicket, getNumberOfTickets, createTicket, updateTicket, deleteTicket
}
