import { QueryResult } from 'pg'
const client = require('../postgres/conn')
client.connect()

const getUsers = async (_req: Express.Request, res: Express.Response) => {
    try {
        await client.query('SELECT * from users', (error: Error, result: QueryResult) => {
            if (error) {
                throw error
            }
            res.status(200).json(result['rows'])
        })
    } catch (e) {
        console.log(e)
        throw (e)
    }

}
declare namespace Express {
    export interface Request {
        body: any;
        params: any;
    }
    export interface Response {
        status: any;
    }
}

const createUser = async (request: Express.Request, response: Express.Response) => {
    const { username, lastname, age, city } = request.body
    try {
        await client.query('INSERT INTO users (username, lastname, age, city) VALUES ($1, $2, $3, $4) RETURNING *', [username, lastname, age, city], (error: Error, results: QueryResult) => {
            if (error) {
                throw error
            }
            response.status(201).send(`User added with ID ${results.rows[0].userid}, name: ${results.rows[0].username}, lastname: ${results.rows[0].lastname}, age: ${results.rows[0].age} and city: ${results.rows[0].city}`)
        })
    } catch (e) {
        console.log(e)
        throw (e)
    }

}
const updateUser = async (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    const { username, lastname, age, city } = request.body
    try {
        await client.query('UPDATE users SET username = $1, lastname = $2, age = $3, city= $4 WHERE userid = $5', [username, lastname, age, city, id], (error: Error, results: QueryResult) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}, name: ${username}, lastname: ${lastname}, age: ${age} and city: ${city}`)
        }
        )
    } catch (e) {
        console.log(e)
        throw (e)
    }
}
const deleteUser = (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    try {
        client.query('DELETE FROM users WHERE userid = $1', [id], (error: Error, results: QueryResult) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User deleted with ID: ${id}`)
        })
    } catch (e) {
        console.log(e)
        throw (e)
    }
}
module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
}