const { QueryResult } = require(`pg`)
const client = require(`../postgres/connection`)
const validate = require(`./validations/validationFunctions`)
const encrypt = require(`../security/encryption`)
const errors = require(`./errorMessages/errors`)

const getUsers = async (_req: Express.Request, res: Express.Response) => {
    try {
        await client.query(`SELECT * from public.user`, (error: Error, result: typeof QueryResult) => {
            if (error) {
                return res.status(400).send(errors.ERROR_GET('users'))
            }
            return res.status(200).json(result.rows)
        })
    } catch (e) {
        console.log(e)
        return res.send(errors.throw_error(e))
    }
}
const createUser = async (request: Express.Request, response: Express.Response) => {
    const { name, last_name, email, password, age, nit, card_number, card_name, expiration, cvv, saldo } = request.body
    const USER_ERROR = errors.ERROR_MESSAGE('CREATE a user')
    if (!name || !last_name || !email || !password || !age || !nit || !card_number ||
        !card_name || !expiration || !cvv || !saldo) {
        return response.status(400).send(errors.ERROR_VARIABLE)
    }
    if (!validate.validateEmail(email)) {
        return response.status(400).send(`Not valid email.`)
    }
    if (age < 18) {
        return response.status(400).send(`Age not valid, must be greater than 18. 
        We do not allow minors to make purchases, as one of our intern politics.`)
    }
    if (!validate.validatePass(password)) {
        return response.status(400).send(`Password must be at least of 6 characters 
        and maximum 12 characters. Password must contain at least: a number, 
        an uppercase letter, a lowercase letter, a digit, a special character 
        and NO blanck spaces`)
    }
    try {
        //await client.query(`BEGIN`)
        const password_encrypted = encrypt.encryptPassword(password)
        await client.query(`INSERT INTO public.user(name, last_name, email, password, age, nit) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, last_name, email, password_encrypted, age, nit],
            (error: Error, results: typeof QueryResult) => {
                if (error) {
                    return response.status(400).send(USER_ERROR)
                }
                client.query(`INSERT INTO creditCard(card_number, card_name, expiration, cvv, user_id, saldo) 
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
                    [card_number, card_name, expiration, cvv, results.rows[0].user_id, saldo],
                    (error: Error, res: typeof QueryResult) => {
                        if (error) {
                            return response.status(400).send(errors.ERROR_MESSAGE('CREATE a card'))
                        }
                        return response.status(201).send(`Card user added with user name: ${results.rows[0].name}, 
                        lastname: ${results.rows[0].last_name}, email: ${results.rows[0].email}, 
                        age: ${results.rows[0].age}, nit: ${results.rows[0].nit}, card name: ${res.rows[0].card_name}, 
                        expiration: ${res.rows[0].expiration}}`)
                    })
            })
        //return await client.query(`COMMIT`)
    } catch (e) {
        //await client.query(`ROLLBACK`)
        console.log(e)
        return response.send(errors.throw_error(e))
    }
}
const updateUser = async (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    const UPDATE_USER_ERROR = errors.ERROR_MESSAGE('UPDATE the user')
    const UPDATE_CARD_ERROR = errors.ERROR_MESSAGE('UPDATE the card')
    const { email, password, nit, card_number, card_name, expiration, cvv, saldo } = request.body
    if (!email || !password || !nit || !card_number ||
        !card_name || !expiration || !cvv || !saldo) {
        return response.status(400).send(errors.ERROR_VARIABLE)
    }
    if (!validate.validateEmail(email)) {
        return response.status(400).send(`Not valid email.`)
    }
    if (!validate.validatePass(password)) {
        return response.status(400).send(`Password must be at least of 6 characters 
        and maximum 12 characters. Password must contain at least: a number, 
        an uppercase letter, a lowercase letter, a digit, a special character 
        and NO blanck spaces`)
    }
    try {
        //await client.query(`BEGIN`)
        await client.query(`select * from public.user where user_id = $1`,
            [id], async (error: Error, results: typeof QueryResult) => {
                if (error) {
                    return response.status(400).send(UPDATE_USER_ERROR)
                }
                if (results.rowCount == 0) {
                    return response.status(400).send(UPDATE_USER_ERROR)
                }
                const new_password_encrypted = encrypt.encryptPassword(password)
                await client.query(`UPDATE public.user SET email = $1, password = $2, nit=$3 
                WHERE user_id = $4`, [email, new_password_encrypted, nit, id],
                    async (error: Error, _results: typeof QueryResult) => {
                        if (error) {
                            return response.status(400).send(UPDATE_USER_ERROR)
                        }
                        await client.query(`UPDATE public.creditcard SET card_number = $1, 
                        card_name = $2, expiration = $3, cvv=$4, saldo =$5 WHERE user_id = $6`,
                            [card_number, card_name, expiration, cvv, saldo, id],
                            (error: Error, _results: typeof QueryResult) => {
                                if (error) {
                                    return response.status(400).send(UPDATE_CARD_ERROR)
                                }
                                return response.status(200).send(`User modified with email: ${email}`)
                            })
                    })
                //return await client.query(`COMMIT;`)
            })
    } catch (e) {
        //await client.query(`ROLLBACK;`)
        console.log(e)
        return response.send(errors.throw_error(e))
    }
}
const deleteUser = async (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    const DELETE_ERROR = errors.ERROR_MESSAGE('DELETE user')
    try {
        //await client.query(`BEGIN`)
        await client.query(`select * from public.user where user_id = $1`,
            [id], async (error: Error, results: typeof QueryResult) => {
                if (error) {
                    return response.status(400).send(DELETE_ERROR)
                }
                if (results.rowCount == 0) {
                    return response.status(400).send(DELETE_ERROR)
                }
                await client.query(`DELETE FROM public.creditCard WHERE user_id = $1`, [id],
                    (error: Error, results: typeof QueryResult) => {
                        if (error) {
                            return response.status(400).send(DELETE_ERROR)
                        }
                        client.query(`DELETE FROM public.user WHERE user_id = $1`, [id],
                            (error: Error, results: typeof QueryResult) => {
                                if (error) {
                                    return response.status(400).send(DELETE_ERROR)
                                }
                                return response.status(200).send(`User and user's cards deleted with ID: ${id}`)
                            })
                    })
            })
        //return await client.query(`COMMIT;`)
    } catch (e) {
        //await client.query(`ROLLBACK;`)
        console.log(e)
        return response.send(errors.throw_error(e))
    }
}
export = {
    getUsers, createUser, updateUser, deleteUser
}