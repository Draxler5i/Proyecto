import { stringify } from "querystring"

const jwtt = require('jsonwebtoken')
const { QueryResult } = require('pg')
const client = require('../postgres/connection')
const validate = require('./validationFunctions')
const async = require("async");
client.connect()

//GET
const getUsers = (_req: Express.Request, res: Express.Response) => {
    try {
        client.query('SELECT * from public.user', (error: Error, result: typeof QueryResult) => {
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
        client.query('SELECT * from ticket', (error: Error, result: typeof QueryResult) => {
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
        client.query('SELECT * from sells', (error: Error, result: typeof QueryResult) => {
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
const getSellsDetails = async (_req: Express.Request, res: Express.Response) => {
    try {
        let details: { sells_id: number, user_id: number, sell_date: string, detail: { detail_id: any, sells_id: any, ticket_id: any, quantity: any }[] }[] = []
        await client.query('SELECT * from sells', async (error: Error, result: typeof QueryResult) => {
            if (error) {
                throw error
            }
            for (let index = 0; index < result.rows.length; index++) {
                let sell_id = parseInt(result.rows[index].sells_id)
                try {
                    client.query('SELECT * from detail where sells_id=$1', [sell_id], async (error: Error, result1: typeof QueryResult) => {
                        if (error) {
                            throw error
                        }
                        details.push({ sells_id: parseInt(result.rows[index].sells_id), user_id: parseInt(result.rows[index].user_id), sell_date: String(result.rows[index].sells_id), detail: result1.rows[0] })
                    })
                } catch (e) {
                    console.log(e)
                    throw (e)
                }
            }
        })
    } catch (e) {
        console.log(e)
        throw (e)
    }
}
const getDetails = (_req: Express.Request, res: Express.Response) => {
    try {
        client.query('SELECT * from detail', (error: Error, result: typeof QueryResult) => {
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
const getDetailsById = (req: Express.Request, res: Express.Response) => {
    const id = parseInt(req.params.id)
    try {
        client.query('SELECT * from detail where sells_id=$1', [id], (error: Error, result: typeof QueryResult) => {
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
        client.query('SELECT * from sells where user_id=$1', [id], (error: Error, result: typeof QueryResult) => {
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
        client.query('SELECT * from stadium', (error: Error, result: typeof QueryResult) => {
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
                    client.query('INSERT INTO public.user(name, last_name, email, password, age, nit) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [name, last_name, email, password, age, nit], (error: Error, results: typeof QueryResult) => {
                        if (error) {
                            throw error
                        }
                        //response.status(201).send(`User added with name: ${results.rows[0].name}, lastname: ${results.rows[0].last_name}, email: ${results.rows[0].email}, age: ${results.rows[0].age}, nit: ${results.rows[0].nit}`)
                        client.query('INSERT INTO creditCard(card_number, card_name, expiration, cvv, user_id, saldo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [card_number, card_name, expiration, cvv, results.rows[0].user_id, saldo], (error: Error, res: typeof QueryResult) => {
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
                response.send('Password must be at least of 6 characters and maximum 12 characters. Password must contain at least: a number, an uppercase letter, a lowercase letter, a digit, a special character and NO blanck spaces')
            }
        } else { response.send('Age not valid, must be greater than 18. We do not allow minors to make purchases, as one of our intern politics.') }
    } else {
        response.send('Not valid email. ')
    }
}
const createTicket = (request: Express.Request, response: Express.Response) => {
    const { price, currency, match_day, stadium_id, type, quantity } = request.body
    try {
        client.query('INSERT INTO ticket ( price, currency, match_day, stadium_id, type, quantity) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [price, currency, match_day, stadium_id, type, quantity], (error: Error, results: typeof QueryResult) => {
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
        client.query('select sum(ca.saldo) as saldo from creditCard as ca where ca.user_id=$1', [user_id], (error: Error, results: typeof QueryResult) => {
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
const getNumberOfTickets = (ticket_id: number, quantity: number): boolean => {
    try {
        client.query('select quantity from ticket where ticket_id=$1', [ticket_id], (error: Error, results: typeof QueryResult) => {
            if (error) {
                console.log(error)
                return error
            }
            if (results.quantity >= quantity) return true
            return false
        })
    } catch (e) {
        console.log(e)
        throw e
    }
    return false
}
//missing discount card client money
const createSell = (request: Express.Request, response: Express.Response) => {
    const { user_id, sell_date, tickets } = request.body
    const arr: { ticket_id: number; quantity: number }[] = tickets
    let total = 0
    let disponibleTicket = true
    for (let i = 0; i < arr.length; i++) {
        total += arr[i].quantity
        if (!getNumberOfTickets(arr[i].ticket_id, arr[i].quantity)) disponibleTicket = false
    }
    if (total >= 10) {
        if (disponibleTicket) {
            try {
                client.query('INSERT INTO public.sells ( user_id, sell_date ) VALUES ($1, $2) RETURNING *', [user_id, sell_date], (error: Error, results: typeof QueryResult) => {
                    if (error) {
                        console.log(error)
                        throw error
                    }
                    for (let index = 0; index < arr.length; index++) {
                        try {
                            client.query('INSERT INTO public.detail ( sells_id, ticket_id, quantity ) VALUES ($1, $2, $3) RETURNING *', [results.rows[0].sells_id, arr[index].ticket_id, arr[index].quantity], (error: Error, results: typeof QueryResult) => {
                                if (error) {
                                    console.log(error)
                                    throw error
                                }
                                client.query('update ticket set quantity = ((select ti.quantity from ticket as ti where ticket_id=$1) - $2) where ticket_id=$1 RETURNING *', [arr[index].ticket_id, arr[index].quantity], (error: Error, res: typeof QueryResult) => {
                                    if (error) {
                                        console.log(error)
                                        throw error
                                    }
                                    //response.status(201).send(`Detail added with ticket id: ${results.rows[0].ticket_id} and quantity: ${results.rows[0].quantity}`)
                                })
                            })
                        } catch (e) {
                            console.log(e)
                            throw (e)
                        }
                    }
                    response.status(201).send(`Sell added with sell date: ${results.rows[0].sell_date}}`)
                })
            } catch (e) {
                console.log(e)
                throw (e)
            }
        } else {
            response.send(`There are no enough tickets for the purchase.`)
        }
    } else {
        response.send(`Quantity of tickets must not surpass 10.`)
    }
}

const returnSell = (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    try {
        client.query('UPDATE creditcard set saldo=((select ca.saldo from creditcard as ca where user_id= (select user_id from sells where sells_id=$1)) + (select sum(d.quantity*ti.price) as amount from public.detail as d, ticket as ti where d.sells_id=$1 and ti.ticket_id=d.ticket_id)) where user_id=(select user_id from sells where sells_id=$1)', [id], (error: Error, results: typeof QueryResult) => {
            if (error) {
                console.log(error)
                throw error
            }

            try {
                client.query('select ticket_id, quantity from public.detail as d, sells where d.sells_id=sells.sells_id and sells.sells_id=$1', [id], (error: Error, res1: typeof QueryResult) => {
                    if (error) {
                        console.log(error)
                        throw error
                    }
                    for (let i = 0; i < res1.rows.length; i++) {
                        client.query('update ticket set quantity = ((select ti.quantity from ticket as ti where ticket_id=$1) + $2) where ticket_id=$1', [res1.rows[i].ticket_id, res1.rows[i].quantity], (error: Error, res: typeof QueryResult) => {
                            if (error) {
                                console.log(error)
                                throw error
                            }
                        })
                    }
                    client.query('delete from public.detail where sells_id=$1', [id], (error: Error, res: typeof QueryResult) => {
                        if (error) {
                            console.log(error)
                            throw error
                        }
                    })
                    client.query('delete from public.sells where sells_id=$1', [id], (error: Error, res: typeof QueryResult) => {
                        if (error) {
                            console.log(error)
                            throw error
                        }
                    })
                })
            } catch (e) {
                console.log(e)
                throw (e)
            }
            response.status(201).send(`Sell returned with sell ID: ${id}}`)
        })
    } catch (e) {
        console.log(e)
        throw (e)
    }
}



const createDetail = (request: Express.Request, response: Express.Response) => {
    const { sells_id, ticket_id, quantity } = request.body
    try {
        client.query('INSERT INTO public.detail ( sells_id, ticket_id, quantity ) VALUES ($1, $2, $3) RETURNING *', [sells_id, ticket_id, quantity], (error: Error, results: typeof QueryResult) => {
            if (error) {
                console.log(error)
                throw error
            }
            client.query('update ticket set quantity = ((select ti.quantity from ticket as ti where ticket_id=$1) - $2) where ticket_id=$1 RETURNING *', [ticket_id, quantity], (error: Error, res: typeof QueryResult) => {
                if (error) {
                    console.log(error)
                    throw error
                }
                response.status(201).send(`Detail added with ticket id: ${results.rows[0].ticket_id} and quantity: ${results.rows[0].quantity}}`)
            })
        })
    } catch (e) {
        console.log(e)
        throw (e)
    }
}
const createStadium = (request: Express.Request, response: Express.Response) => {
    const { stadium_name, address } = request.body
    try {
        client.query('INSERT INTO public.sells ( stadium_name, address ) VALUES ($1, $2) RETURNING *', [stadium_name, address], (error: Error, results: typeof QueryResult) => {
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
        client.query('UPDATE public.user SET email = $1, password = $2, age = $3, nit:$4  WHERE user_id = $5', [email, password, age, nit, id], (error: Error, results: typeof QueryResult) => {
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
        client.query('UPDATE ticket SET price = $1, currency = $2, match_day = $3, stadium_name = $4, quantity = $5 WHERE ticket_id = $6', [price, currency, match_day, stadium_name, quantity, id], (error: Error, results: typeof QueryResult) => {
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
        client.query('UPDATE sells SET user_id = $1, ticket_id= $2 WHERE user_id = $3', [user_id, ticket_id, id], (error: Error, results: typeof QueryResult) => {
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
        client.query('UPDATE stadium SET stadium_name = $1, address = $2 WHERE user_id = $3', [stadium_name, address, id], (error: Error, results: typeof QueryResult) => {
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
        client.query('DELETE FROM public.user WHERE user_id = $1', [id], (error: Error, results: typeof QueryResult) => {
            if (error) {
                throw error
            }
            client.query('DELETE FROM public.creditCard WHERE user_id = $1', [id], (error: Error, results: typeof QueryResult) => {
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
        client.query('DELETE FROM ticket WHERE ticket_id = $1', [id], (error: Error, results: typeof QueryResult) => {
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
        client.query('DELETE FROM detail WHERE sells_id=$1', [id], (error: Error, results: typeof QueryResult) => {
            if (error) {
                throw error
            }
            client.query('DELETE FROM sells WHERE sells_id = $1', [id], (error: Error, res: typeof QueryResult) => {
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
        client.query('DELETE FROM stadium WHERE stadium_id = $1', [id], (error: Error, results: typeof QueryResult) => {
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
        client.query('SELECT * FROM public.user WHERE email = $1 AND password = $2', [email, password], (error: Error, results: typeof QueryResult) => {
            if (error) throw error
            if (results['rows'].length > 0) {
                // Authenticate the user
                req.session.loggedin = true
                req.session.email = email
                const token = jwtt.sign(
                    { email },
                    process.env.TOKEN,
                    {
                        expiresIn: '1h',
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
    res.status(200).send('Welcome 🙌 ')
}

module.exports = {
    getUsers, getTicket, getStadiums, getSells, getDetails, getDetailsById, getSellsByUserId, getSaldo,
    createUser, createTicket, createStadium, createSell, createDetail,
    updateUser, updateTicket, updateStadum,
    deleteUser, deleteTicket, deleteStadium, deleteSell,
    login, home, welcome, returnSell
}