import { QueryResult } from 'pg'
const jwt = require('jsonwebtoken')
const client = require('../postgres/connection')
const validate = require('./validationFunctions')
client.connect()
//GET
const getUsers = (_req: Express.Request, res: Express.Response) => {
    try {
        client.query('SELECT * from public.user', (error: Error, result: QueryResult) => {
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
const getTicket = (_req: Express.Request, res: Express.Response) => {
    try {
        client.query('SELECT * from ticket', (error: Error, result: QueryResult) => {
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
const getSells = (_req: Express.Request, res: Express.Response) => {
    try {
        client.query('SELECT * from sells', (error: Error, result: QueryResult) => {
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
const getStadiums = (_req: Express.Request, res: Express.Response) => {
    try {
        client.query('SELECT * from stadium', (error: Error, result: QueryResult) => {
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
//POST
const createUser = (request: Express.Request, response: Express.Response) => {
    const { name, last_name, email, password, age } = request.body
    if (validate.validateEmail(email)) {
        if (age >= 18) {
            if (validate.validatePass(password)) {
                try {
                    client.query('INSERT INTO public.user(name, last_name, email, password, age) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, last_name, email, password, age], (error: Error, results: QueryResult) => {
                        if (error) {
                            throw error
                        }
                        response.status(201).send(`User added with ID ${results.rows[0].user_id}, name: ${results.rows[0].name}, lastname: ${results.rows[0].last_name}, email: ${results.rows[0].email}, age: ${results.rows[0].age}`)
                    })
                } catch (e) {
                    console.log(e)
                    throw (e)
                }
            } else {
                response.send('Password must be minimum of 6 characters and contain at least one number and at least one capital letter')
            }
        } else { response.send('Age not valid, must be =>18') }
    } else {
        response.send('Not valid email. ')
    }
}
const createTicket = (request: Express.Request, response: Express.Response) => {
    const { price, currency, match_day, stadium_id } = request.body
    try {
        client.query('INSERT INTO ticket ( price, currency, match_day, stadium_id) VALUES ($1, $2, $3, $4) RETURNING *', [price, currency, match_day, stadium_id], (error: Error, results: QueryResult) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Ticket added with ID ${results.rows[0].ticket_id}, price: ${results.rows[0].price}, currency: ${results.rows[0].currency}, match_day: ${results.rows[0].match_day}, stadium id: ${results.rows[0].stadium_id}`)
        })
    } catch (e) {
        console.log(e)
        throw (e)
    }
}
const createSell = (request: Express.Request, response: Express.Response) => {
    const { user_id, ticket_id, total_amount, user_nit } = request.body
    try {
        client.query('INSERT INTO public.sells ( user_id, ticket_id, total_amount, user_nit ) VALUES ($1, $2, $3, $4) RETURNING *', [user_id, ticket_id, total_amount, user_nit], (error: Error, results: QueryResult) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Sell added with ID: ${results.rows[0].sells_id}, ticket_id: ${results.rows[0].ticket_id}, user_id: ${results.rows[0].user_id}, total amount: ${results.rows[0].total_amount}, NIT: ${results.rows[0].user_nit}`)
        })
    } catch (e) {
        console.log(e)
        throw (e)
    }
}
const createStadiium = (request: Express.Request, response: Express.Response) => {
    const { stadium_name, address } = request.body
    try {
        client.query('INSERT INTO public.sells ( stadium_name, address ) VALUES ($1, $2) RETURNING *', [stadium_name, address], (error: Error, results: QueryResult) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Stadium added with ID: ${results.rows[0].stadium_id}, stadium_name: ${results.rows[0].stadium_name}, stadium address: ${results.rows[0].address}`)
        })
    } catch (e) {
        console.log(e)
        throw (e)
    }
}
//PUT
const updateUser = (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    const { name, last_name, email, password, age } = request.body
    try {
        client.query('UPDATE public.user SET name = $1, last_name = $2, email = $3, password = $4, age = $5 WHERE user_id = $6', [name, last_name, email, password, age, id], (error: Error, results: QueryResult) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}, name: ${name} ${last_name}, email: ${email}, password: ${password}, age: ${age}`)
        })
    } catch (error) {
        console.log(error)
        throw (error)
    }
}
const updateTicket = (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    const { price, currency, match_day, stadium_name } = request.body
    try {
        client.query('UPDATE ticket SET price = $1, currency = $2, match_day = $3, stadium_name = $4 WHERE ticket_id = $5', [price, currency, match_day, stadium_name, id], (error: Error, results: QueryResult) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Ticket modified with ID: ${id}, price: ${price}, currency: ${currency}, match_day: ${match_day}, stadium name: ${stadium_name}`)
        })
    } catch (error) {
        console.log(error)
        throw (error)
    }
}
const updateSell = (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    const { user_id, ticket_id } = request.body
    try {
        client.query('UPDATE sells SET user_id = $1, ticket_id= $2 WHERE user_id = $3', [user_id, ticket_id, id], (error: Error, results: QueryResult) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Sell modified with ID: ${id}, user id: ${user_id}, ticket id: ${ticket_id}`)
        })
    } catch (error) {
        console.log(error)
        throw (error)
    }
}
const updateStadum = (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    const { stadium_name, address } = request.body
    try {
        client.query('UPDATE stadium SET stadium_name = $1, address = $2 WHERE user_id = $3', [stadium_name, address, id], (error: Error, results: QueryResult) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Stadium modified with ID: ${id}, stadium name: ${stadium_name}, address: ${address}`)
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
        client.query('DELETE FROM public.user WHERE user_id = $1', [id], (error: Error, results: QueryResult) => {
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
            response.status(200).send(`Ticket deleted with ID: ${id}`)
        })
    } catch (error) {
        console.log(error)
        throw (error)
    }
}
const deleteSell = (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    try {
        client.query('DELETE FROM sells WHERE sells_id = $1', [id], (error: Error, results: QueryResult) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Sell deleted with ID: ${id}`)
        })
    } catch (error) {
        console.log(error)
        throw (error)
    }
}
const deleteStadium = (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    try {
        client.query('DELETE FROM stadium WHERE stadium_id = $1', [id], (error: Error, results: QueryResult) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Stadium deleted with ID: ${id}`)
        })
    } catch (error) {
        console.log(error)
        throw (error)
    }
}
//Login
const login = (req: Express.Request, res: Express.Response) => {
    const { email, password } = req.body
    if (email && password) {
        client.query('SELECT * FROM public.user WHERE email = $1 AND password = $2', [email, password], (error: Error, results: QueryResult) => {
            if (error) throw error
            if (results['rows'].length > 0) {
                // Authenticate the user
                req.session.loggedin = true
                req.session.email = email
                const token = jwt.sign(
                    { email, password },
                    process.env.TOKEN,
                    {
                        expiresIn: "1h",
                    }
                )
                let json = {
                    token_access: token,
                }
                res.send(json)
            } else {
                res.send('Incorrect email and/or Password!')
            }
        })
    } else {
        res.send('Please enter email and Password!')
    }
}
//main page
const home = (req: Express.Request, res: Express.Response) => {
    // If the user is loggedin
    if (req.session.loggedin) {
        res.send('Welcome back, ' + req.session.email + '!')
    } else {
        res.send('Please login to view this page!')
    }
}
const welcome = (req: Express.Request, res: Express.Response) => {
    res.status(200).send("Welcome 🙌 ")
}

module.exports = { getUsers, createUser, deleteUser, updateUser, getTicket, createTicket, deleteTicket, updateTicket, getStadiums, createStadiium, updateStadum, deleteStadium, getSells, createSell, updateSell, deleteSell, login, home, welcome }