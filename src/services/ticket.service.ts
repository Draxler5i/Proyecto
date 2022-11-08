const { QueryResult } = require(`pg`)
const client = require(`../postgres/connection`)

const getTicket = async (_req: Express.Request, res: Express.Response) => {
    try {
        await client.query(`SELECT * from ticket`, (error: Error, result: typeof QueryResult) => {
            if (error) {
                throw error
            }
            res.status(200).json(result[`rows`])
        })
    } catch (e) {
        console.log(e)
        throw (e)
    }
}
const getNumberOfTickets = (ticket_id: number, quantity: number): boolean => {
    try {
        client.query(`select quantity from ticket where ticket_id=$1`, [ticket_id],
            (error: Error, results: typeof QueryResult) => {
                if (error) {
                    console.log(error)
                    return error
                }
                if (results.rows[0].quantity >= quantity) return true
                return false
            })
    } catch (e) {
        console.log(e)
        throw e
    }
    return false
}
const createTicket = async (request: Express.Request, response: Express.Response) => {
    const { price, currency, match_day, stadium_id, type, quantity } = request.body
    try {
        await client.query(`INSERT INTO ticket ( price, currency, match_day, stadium_id, type, quantity) VALUES ($1, $2, $3, $4, $5, $6)`,
            [price, currency, match_day, stadium_id, type, quantity],
            (error: Error, results: typeof QueryResult) => {
                if (error) {
                    throw error
                }
                response.status(201).send(`Ticket added with price: ${results.rows[0].price}, 
                currency: ${results.rows[0].currency}, match_day: ${results.rows[0].match_day}, 
                stadium id: ${results.rows[0].stadium_id}, type: ${results.rows[0].type}, 
                quantity: ${results.rows[0].quantity}`)
            })
    } catch (e) {
        console.log(e)
        throw (e)
    }
}
const updateTicket = async (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    const { price, currency, match_day, stadium_name, quantity } = request.body
    try {
        await client.query(`UPDATE ticket SET price = $1, currency = $2, match_day = $3, stadium_name = $4, quantity = $5 WHERE ticket_id = $6`,
            [price, currency, match_day, stadium_name, quantity, id],
            (error: Error, results: typeof QueryResult) => {
                if (error) {
                    throw error
                }
                response.status(200).send(`Ticket modified with price: ${price}, 
                currency: ${currency}, match_day: ${match_day}, stadium name: ${stadium_name}`)
            })
    } catch (error) {
        console.log(error)
        throw (error)
    }
}
const deleteTicket = async (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    try {
        await client.query(`DELETE FROM ticket WHERE ticket_id = $1`, [id],
            (error: Error, results: typeof QueryResult) => {
                if (error) {
                    throw error
                }
                response.status(200).send(`Ticket deleted with ID: ${id}`)
            })
    } catch (error) {
        console.log(error)
        throw (error)
    }
}
export = {
    getTicket, getNumberOfTickets, createTicket, updateTicket, deleteTicket
}
