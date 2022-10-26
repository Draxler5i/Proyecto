import { QueryResult } from 'pg'
const client = require('../postgres/dbConnection')
client.connect()

declare namespace Express {
    export interface Request {
        body: any;
        params: any;
    }
    export interface Response {
        status: any;
    }
}

//GET
const getUsers = (_req: Express.Request, res: Express.Response) => {
    try {
        client.query('SELECT * from users', (error: Error, result: QueryResult) => {
            if (error) {
                throw error
            }
            res.status(200).json(result)
        })
    } catch (e) {
        console.log(e)
        throw (e)
    }
}


const getTicket = (_req: Express.Request, res: Express.Response) => {
    try {
        client.query('SELECT * from ticket', (error: Error, result: QueryResult) => {
            if (error) {
                throw error
            }
            res.status(200).json(result)
        })
    } catch (e) {
        console.log(e)
        throw (e)
    }
}

//POST
const createUser = (request: Express.Request, response: Express.Response) => {
    const { name, email, cellphone, age, address, created, country, state } = request.body
    try {
        client.query('INSERT INTO users (name, email, cellphone, age, address, created, country, state) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [name, email, cellphone, age, address, created, country, state], (error: Error, results: QueryResult) => {
            if (error) {
                throw error
            }
            response.status(201).send(`User added with ID ${results.rows[0].user_id}, name: ${results.rows[0].name}, email: ${results.rows[0].email}, cellphone: ${results.rows[0].cellphone} age: ${results.rows[0].age}, address: ${results.rows[0].address}, created: ${results.rows[0].created}, country: ${results.rows[0].country}, state: ${results.rows[0].state}`)
        })
    } catch (e) {
        console.log(e)
        throw (e)
    }
}

const createTicket = (request: Express.Request, response: Express.Response) => {
    const { price, category, match_date, stadium, created } = request.body
    try {
        client.query('INSERT INTO ticket ( price, category, match_date, stadium, created) VALUES ($1, $2, $3, $4, $5) RETURNING *', [ price, category, match_date, stadium, created], (error: Error, results: QueryResult) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Ticket added with ID ${results.rows[0].ticket_id}, name: ${results.rows[0].price}, category: ${results.rows[0].category}, match_date: ${results.rows[0].match_date}, stadium: ${results.rows[0].stadium}, created: ${results.rows[0].created}`)
        })
    } catch (e) {
        console.log(e)
        throw (e)
    }
}

//PUT
const updateUser = (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    const { name, email, cellphone, age, address, country, state } = request.body
    try {
        client.query('UPDATE users SET name = $1, email = $2, cellphone = $3, age= $4, address = $5, country = $6, state = $7 WHERE user_id = $8', [name, email, cellphone, age, address, country, state, id], (error: Error, results: QueryResult) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}, name: ${name}, email: ${email}, cellphone: ${cellphone}, age: ${age}, address: ${address}, country: ${country}, state: ${state}`)
        })
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

const updateTicket = (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    const { price, category, match_date, stadium, created } = request.body
    try {
         client.query('UPDATE ticket SET price = $1, category = $2, match_date = $3, stadium= $4, created = $5 WHERE ticket_id = $6', [price, category, match_date, stadium, created, id], (error: Error, results: QueryResult) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}, price: ${price}, category: ${category}, match_date: ${match_date}, stadium: ${stadium}, created: ${created}`)
        })
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

//DELETE
const deleteUser = (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    try {
        client.query('DELETE FROM users WHERE user_id = $1', [id], (error: Error, results: QueryResult) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User deleted with ID: ${id}`)
        })
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

const deleteTicket = (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    try {
        client.query('DELETE FROM ticket WHERE ticket_id = $1', [id], (error: Error, results: QueryResult) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User deleted with ID: ${id}`)
        })
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export {getUsers, getTicket, createUser, createTicket, updateUser, updateTicket, deleteUser, deleteTicket}