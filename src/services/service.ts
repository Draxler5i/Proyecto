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
const getDetails = (_req: Express.Request, res: Express.Response) => {
    try {
        client.query('SELECT * from detail', (error: Error, result: QueryResult) => {
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
const getDetailsById = (req: Express.Request, res: Express.Response) => {
    const id = parseInt(req.params.id)
    try {
        client.query('SELECT * from detail where sells_id=$1', [id], (error: Error, result: QueryResult) => {
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
const getSellsByUserId = (req: Express.Request, res: Express.Response) => {
    const id = parseInt(req.params.id)
    try {
        client.query('SELECT * from sells where user_id=$1', [id], (error: Error, result: QueryResult) => {
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
    const { name, last_name, email, password, age, nit, card_number, card_name, expiration, cvv, saldo } = request.body
    if (validate.validateEmail(email)) {
        if (age >= 18) {
            if (validate.validatePass(password)) {
                try {
                    client.query('INSERT INTO public.user(name, last_name, email, password, age, nit) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [name, last_name, email, password, age, nit], (error: Error, results: QueryResult) => {
                        if (error) {
                            throw error
                        }
                        //response.status(201).send(`User added with name: ${results.rows[0].name}, lastname: ${results.rows[0].last_name}, email: ${results.rows[0].email}, age: ${results.rows[0].age}, nit: ${results.rows[0].nit}`)
                        client.query('INSERT INTO creditCard(card_number, card_name, expiration, cvv, user_id, saldo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [card_number, card_name, expiration, cvv, results.rows[0].user_id, saldo], (error: Error, res: QueryResult) => {
                            if (error) {
                                throw error
                            }
                            response.status(201).send(`Card user added with user name: ${results.rows[0].name}, lastname: ${results.rows[0].last_name}, email: ${results.rows[0].email}, age: ${results.rows[0].age}, nit: ${results.rows[0].nit}, card name: ${res.rows[0].card_name}, expiration: ${res.rows[0].expiration}}`)
                        })
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
    const { price, currency, match_day, stadium_id, type, quantity } = request.body
    try {
        client.query('INSERT INTO ticket ( price, currency, match_day, stadium_id, type, quantity) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [price, currency, match_day, stadium_id, type, quantity], (error: Error, results: QueryResult) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Ticket added with price: ${results.rows[0].price}, currency: ${results.rows[0].currency}, match_day: ${results.rows[0].match_day}, stadium id: ${results.rows[0].stadium_id}, type: ${results.rows[0].type}, quantity: ${results.rows[0].quantity}`)
        })
    } catch (e) {
        console.log(e)
        throw (e)
    }
}
const getSaldo = (request: Express.Request, response: Express.Response) => {
    const { user_id } = request.body
    try {
        client.query('select sum(ca.saldo) as saldo from creditCard as ca where ca.user_id=$1', [user_id], (error: Error, results: QueryResult) => {
            if (error) {
                console.log(error)
                throw error
            }
            if (parseFloat(results.rows[0].saldo) > 0) {
                response.send(`Ud tiene ${results.rows[0].saldo} Bs.`)
            } else {
                response.send(`NO existe suficiente saldo para realizar la compra. Ud tiene ${results.rows[0].saldo} Bs.`)
            }
        })
    } catch (e) {
        console.log(e)
        throw (e)
    }
}
const createSell = (request: Express.Request, response: Express.Response) => {
    const { user_id, sell_date } = request.body
    try {
        client.query('INSERT INTO public.sells ( user_id, sell_date ) VALUES ($1, $2) RETURNING *', [user_id, sell_date], (error: Error, results: QueryResult) => {
            if (error) {
                console.log(error)
                throw error
            }
            response.status(201).send(`Sell added with sell date: ${results.rows[0].sell_date}}`)
        })
    } catch (e) {
        console.log(e)
        throw (e)
    }
}
const createDetail = (request: Express.Request, response: Express.Response) => {
    const { sells_id, ticket_id, quantity } = request.body
    try {
        client.query('INSERT INTO public.detail ( sells_id, ticket_id, quantity ) VALUES ($1, $2, $3) RETURNING *', [sells_id, ticket_id, quantity], (error: Error, results: QueryResult) => {
            if (error) {
                console.log(error)
                throw error
            }
            response.status(201).send(`Detail added with ticket id: ${results.rows[0].ticket_id} and quantity: ${results.rows[0].quantity}}`)
        })
    } catch (e) {
        console.log(e)
        throw (e)
    }
}
const createStadium = (request: Express.Request, response: Express.Response) => {
    const { stadium_name, address } = request.body
    try {
        client.query('INSERT INTO public.sells ( stadium_name, address ) VALUES ($1, $2) RETURNING *', [stadium_name, address], (error: Error, results: QueryResult) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Stadium added with stadium_name: ${results.rows[0].stadium_name}, stadium address: ${results.rows[0].address}`)
        })
    } catch (e) {
        console.log(e)
        throw (e)
    }
}
//PUT
const updateUser = (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    const { email, password, age, nit } = request.body
    try {
        client.query('UPDATE public.user SET email = $1, password = $2, age = $3, nit:$4  WHERE user_id = $5', [email, password, age, nit, id], (error: Error, results: QueryResult) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with email: ${email}, nit: ${nit}`)
        })
    } catch (error) {
        console.log(error)
        throw (error)
    }
}
const updateTicket = (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    const { price, currency, match_day, stadium_name, quantity } = request.body
    try {
        client.query('UPDATE ticket SET price = $1, currency = $2, match_day = $3, stadium_name = $4, quantity = $5 WHERE ticket_id = $6', [price, currency, match_day, stadium_name, quantity, id], (error: Error, results: QueryResult) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Ticket modified with price: ${price}, currency: ${currency}, match_day: ${match_day}, stadium name: ${stadium_name}`)
        })
    } catch (error) {
        console.log(error)
        throw (error)
    }
}
/*const updateSell = (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    const { user_id, ticket_id } = request.body
    try {
        client.query('UPDATE sells SET user_id = $1, ticket_id= $2 WHERE user_id = $3', [user_id, ticket_id, id], (error: Error, results: QueryResult) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Sell modified with user id: ${user_id}, ticket id: ${ticket_id}`)
        })
    } catch (error) {
        console.log(error)
        throw (error)
    }
}*/
const updateStadum = (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    const { stadium_name, address } = request.body
    try {
        client.query('UPDATE stadium SET stadium_name = $1, address = $2 WHERE user_id = $3', [stadium_name, address, id], (error: Error, results: QueryResult) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Stadium modified with stadium name: ${stadium_name}, address: ${address}`)
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
            client.query('DELETE FROM public.creditCard WHERE user_id = $1', [id], (error: Error, results: QueryResult) => {
                if (error) {
                    throw error
                }
                response.status(200).send(`User and user's cards deleted with ID: ${id}`)
            })
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
        client.query('DELETE FROM detail WHERE sells_id=$1', [id], (error: Error, results: QueryResult) => {
            if (error) {
                throw error
            }
            client.query('DELETE FROM sells WHERE sells_id = $1', [id], (error: Error, res: QueryResult) => {
                if (error) {
                    throw error
                }
                response.status(200).send(`Sell deleted with ID: ${id}`)
            })
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
                    { email },
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

module.exports = {
    getUsers, getTicket, getStadiums, getSells, getDetails, getDetailsById, getSellsByUserId, getSaldo,
    createUser, createTicket, createStadium, createSell, createDetail,
    updateUser, updateTicket, updateStadum,
    deleteUser, deleteTicket, deleteStadium, deleteSell,
    login, home, welcome
}