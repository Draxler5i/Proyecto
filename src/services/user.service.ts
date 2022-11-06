const { QueryResult } = require('pg')
const client = require('../postgres/connection')
const validate = require('./validations/validationFunctions')
const encrypt = require('../security/encryption')
const util = require('util')

const getUsers = async (_req: Express.Request, res: Express.Response) => {
    try {
        await client.query('SELECT * from public.user', (error: Error, result: typeof QueryResult) => {
            if (error) {
                throw error
            }
            res.status(200).json(result.rows)
        })
    } catch (e) {
        console.log(e)
        throw (e)
    }
}
const createUser = async (request: Express.Request, response: Express.Response) => {
    const { name, last_name, email, password, age, nit, card_number, card_name, expiration, cvv, saldo } = request.body
    if (!validate.validateEmail(email)) return response.send('Not valid email. ')
    if (age < 18) return response.send(`Age not valid, must be greater than 18. 
    We do not allow minors to make purchases, as one of our intern politics.`)
    if (!validate.validatePass(password)) return response.send(`Password must be at least of 6 characters and maximum 12 characters. 
    Password must contain at least: a number, an uppercase letter, a lowercase letter, a digit, a special character and NO blanck spaces`)
    client.query = util.promisify(client.query);
    try {
        await client.query('BEGIN')
        const password_encrypted = encrypt.encryptPassword(password)
        await client.query('INSERT INTO public.user(name, last_name, email, password, age, nit) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, last_name, email, password_encrypted, age, nit],
            async (error: Error, results: typeof QueryResult) => {
                if (error) {
                    response.send('A problem occured when trying to add new user')
                }
                await client.query('INSERT INTO creditCard(card_number, card_name, expiration, cvv, user_id, saldo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                    [card_number, card_name, expiration, cvv, results.rows[0].user_id, saldo],
                    (error: Error, res: typeof QueryResult) => {
                        if (error) {
                            response.send(`A problem occured when trying to add user's card`)
                        }
                        response.status(201).send(`Card user added with user name: ${results.rows[0].name}, 
                lastname: ${results.rows[0].last_name}, email: ${results.rows[0].email}, 
                age: ${results.rows[0].age}, nit: ${results.rows[0].nit}, card name: ${res.rows[0].card_name}, 
                expiration: ${res.rows[0].expiration}}`)
                    })
            })
        return await client.query('COMMIT;')
    } catch (e) {
        await client.query('ROLLBACK;')
        console.log(e)
        throw (e)
    }
}
const updateUser = async (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    const { email, password, age, nit, card_number, card_name, expiration, cvv, saldo } = request.body
    try {
        await client.query('BEGIN')
        const new_password_encrypted = encrypt.encryptPassword(password)
        await client.query('UPDATE public.user SET email = $1, password = $2, age = $3, nit=$4  WHERE user_id = $5',
            [email, new_password_encrypted, age, nit, id], async (error: Error, results: typeof QueryResult) => {
                if (error) {
                    throw error
                }
                await client.query('UPDATE public.creditcard SET card_number = $1, card_name = $2, expiration = $3, cvv=$4, saldo =$5 WHERE user_id = $6',
                    [card_number, card_name, expiration, cvv, saldo, id], (error: Error, results: typeof QueryResult) => {
                        if (error) {
                            throw error
                        }
                        response.status(200).send(`User modified with email: ${email}`)
                    })
            })
        return await client.query('COMMIT;')
    } catch (error) {
        await client.query('ROLLBACK;')
        console.log(error)
        throw (error)
    } finally {
        client.release()
    }
}
const deleteUser = async (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    try {
        await client.query('BEGIN')
        await client.query('DELETE FROM public.creditCard WHERE user_id = $1', [id], async (error: Error, results: typeof QueryResult) => {
            if (error) {
                throw error
            }
            await client.query('DELETE FROM public.user WHERE user_id = $1', [id], (error: Error, results: typeof QueryResult) => {
                if (error) {
                    throw error
                }

                response.status(200).send(`User and user's cards deleted with ID: ${id}`)
            })
        })
        return await client.query('COMMIT;')
    } catch (error) {
        await client.query('ROLLBACK;')
        console.log(error)
        throw (error)
    }
}
export = {
    getUsers, createUser, updateUser, deleteUser
}