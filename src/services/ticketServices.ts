const ticket = require('../database/connection')
const getTicket = async (req: any, res: any) => {
    try {
        await ticket.query('SELECT * FROM ticket', (error: any, results: any, fields: any) => {
            if (error) throw error
            res.status(200).send(results)
        })
    } catch (error) {
        throw (error)
    }
}
const putTicket = async (req: any, res: any) => {
    const id = req.params.id
    const { price, category, match_date, stadio } = req.body
    if (!id) {
        throw res.status(400)
    }
    try {
        await ticket.query('UPDATE ticket SET price=?, category=?, match_date=?, stadio=? WHERE ticket_id = ?', [price, category, match_date, stadio, id], (error: any, result: any) => {
            if (error) throw error
            res.status(200).send(`Ticket updated successfully with id: ${id}, price: ${price}, category:${category}, match_date:${match_date}, stadio=${stadio}`)
        })
    } catch (error) {
        throw (error)
    }
}
const postTicket = async (req: any, res: any) => {
    const { price, category, match_date, stadio } = req.body
    try {
        await ticket.query('INSERT INTO ticket (price, category, match_date, stadio) values(?,?,?,?)', [price, category, match_date, stadio], (error: any, result: any) => {
            if (error) throw error
            res.status(201).send(`Ticket added with ID: ${result.insertId}, price:${price}, category:${category}, match_date:${match_date}, stadio:${stadio}`)
        })
    } catch (error) {
        throw (error)
    }
}
const deleteTicket = async (req: any, res: any) => {
    const id = req.params.id
    if (!id) {
        throw res.status(400)
    }
    try {
        await ticket.query('DELETE FROM ticket WHERE ticket_id =?', id, (error: any, result: any) => {
            if (error) throw error
            res.status(200).send(`Ticket wih id ${id} deleted sucessfully `)
        })
    } catch (error) {
        throw (error)
    }
}
module.exports = {
    getTicket,
    putTicket,
    postTicket,
    deleteTicket
}