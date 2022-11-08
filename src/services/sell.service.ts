const { QueryResult } = require(`pg`)
const client = require(`../postgres/connection`)
const ticket = require(`./ticket.service`)
client.connect()
const getSells = async (_req: Express.Request, res: Express.Response) => {
    try {
        await client.query(`SELECT * from sells`, (error: Error, result: typeof QueryResult) => {
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
const getSellsDetails = async (_req: Express.Request, res: Express.Response) => {
    try {
        await client.query(`BEGIN`)
        const details: {
            sells_id: number, user_id: number, sell_date: string,
            detail: { detail_id: any, sells_id: any, ticket_id: any, quantity: any }[]
        }[] = []
        await client.query(`SELECT * from sells`, async (error: Error, result: typeof QueryResult) => {
            if (error) {
                throw error
            }
            for (let index = 0; index < result.rows.length; index++) {
                const sell_id = parseInt(result.rows[index].sells_id)
                await client.query(`SELECT * from detail where sells_id=$1`,
                    [sell_id], async (error: Error, result1: typeof QueryResult) => {
                        if (error) {
                            throw error
                        }
                        details.push({
                            sells_id: parseInt(result.rows[index].sells_id),
                            user_id: parseInt(result.rows[index].user_id),
                            sell_date: String(result.rows[index].sells_id),
                            detail: result1.rows[0]
                        })
                    })
            }
        })
        return await client.query(`COMMIT;`)
    } catch (e) {
        await client.query(`ROLLBACK;`)
        console.log(e)
        throw (e)
    }
}
const getDetails = async (_req: Express.Request, res: Express.Response) => {
    try {
        await client.query(`SELECT * from detail`, (error: Error, result: typeof QueryResult) => {
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
const getDetailsById = async (req: Express.Request, res: Express.Response) => {
    const id = parseInt(req.params.id)
    try {
        await client.query(`SELECT * from detail where sells_id=$1`, [id],
            (error: Error, result: typeof QueryResult) => {
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
const getSellsByUserId = async (req: Express.Request, res: Express.Response) => {
    const id = parseInt(req.params.id)
    try {
        await client.query(`SELECT * from sells where user_id=$1`, [id],
            (error: Error, result: typeof QueryResult) => {
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
const getSaldo = async (request: Express.Request, response: Express.Response) => {
    const { user_id } = request.body
    try {
        await client.query(`select sum(ca.saldo) as saldo from creditCard as ca where ca.user_id=$1`,
            [user_id], (error: Error, results: typeof QueryResult) => {
                if (error) {
                    console.log(error)
                    throw error
                }
                if (parseFloat(results.rows[0].saldo) > 0) {
                    response.send(`Ud tiene ${results.rows[0].saldo} Bs.`)
                } else {
                    response.send(`NO existe suficiente saldo para realizar la compra. 
                    Ud tiene ${results.rows[0].saldo} Bs.`)
                }
            })
    } catch (e) {
        console.log(e)
        throw (e)
    }
}
const createSell = async (request: Express.Request, response: Express.Response) => {
    const { user_id, sell_date, tickets } = request.body
    const arr: { ticket_id: number; quantity: number }[] = tickets
    let total = 0
    let disponibleTicket = true
    for (let i = 0; i < arr.length; i++) {
        total += arr[i].quantity
        if (!ticket.getNumberOfTickets(arr[i].ticket_id, arr[i].quantity)) disponibleTicket = false
    }
    if (total >= 10) return response.send(`Quantity of tickets must not surpass 10.`)
    if (disponibleTicket) return response.send(`There are no enough tickets for the purchase.`)
    try {
        await client.query(`BEGIN`)
        await client.query(`INSERT INTO public.sells ( user_id, sell_date ) VALUES ($1, $2) RETURNING *`,
            [user_id, sell_date], async (error: Error, results: typeof QueryResult) => {
                if (error) {
                    console.log(error)
                    throw error
                }
                for (let index = 0; index < arr.length; index++) {
                    await client.query(`INSERT INTO public.detail ( sells_id, ticket_id, quantity ) VALUES ($1, $2, $3) RETURNING *`,
                        [results.rows[0].sells_id, arr[index].ticket_id, arr[index].quantity],
                        async (error: Error, results: typeof QueryResult) => {
                            if (error) {
                                console.log(error)
                                throw error
                            }
                            await client.query(`update ticket set quantity = ((select ti.quantity from ticket as ti where ticket_id=$1) - $2) where ticket_id=$1 RETURNING *`,
                                [arr[index].ticket_id, arr[index].quantity],
                                (error: Error, res: typeof QueryResult) => {
                                    if (error) {
                                        console.log(error)
                                        throw error
                                    }
                                })
                        })
                    await client.query(`select price from ticket where ticket_id=$1`,
                        [arr[index].ticket_id],
                        async (error: Error, res: typeof QueryResult) => {
                            if (error) {
                                console.log(error)
                                throw error
                            }
                            await client.query(`UPDATE creditcard set saldo=((select ca.saldo from creditcard as ca where user_id= $1) - (${res.rows[0].price} * ${arr[index].quantity})) where user_id=$1`,
                                [user_id],
                                (error: Error, res: typeof QueryResult) => {
                                    if (error) {
                                        console.log(error)
                                        throw error
                                    }
                                })
                        })
                }
                response.status(201).send(`Sell added with sell date: ${results.rows[0].sell_date}}`)
            })
        return await client.query(`COMMIT;`)
    } catch (e) {
        await client.query(`ROLLBACK;`)
        console.log(e)
        throw (e)
    }
}
const returnSell = async (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    try {
        await client.query(`BEGIN`)
        await client.query(`UPDATE creditcard set saldo=((select ca.saldo from creditcard as ca where user_id= (select user_id from sells where sells_id=$1)) + (select sum(d.quantity*ti.price) as amount from public.detail as d, ticket as ti where d.sells_id=$1 and ti.ticket_id=d.ticket_id)) where user_id=(select user_id from sells where sells_id=$1)`, [id], async (error: Error, results: typeof QueryResult) => {
            if (error) {
                console.log(error)
                throw error
            }
            await client.query(`select ticket_id, quantity from public.detail as d, sells where d.sells_id=sells.sells_id and sells.sells_id=$1`, [id], async (error: Error, res1: typeof QueryResult) => {
                if (error) {
                    console.log(error)
                    throw error
                }
                for (let i = 0; i < res1.rows.length; i++) {
                    await client.query(`update ticket set quantity = ((select ti.quantity from ticket as ti where ticket_id=$1) + $2) where ticket_id=$1`, [res1.rows[i].ticket_id, res1.rows[i].quantity], (error: Error, res: typeof QueryResult) => {
                        if (error) {
                            console.log(error)
                            throw error
                        }
                    })
                }
                await client.query(`delete from public.detail where sells_id=$1`, [id], (error: Error, res: typeof QueryResult) => {
                    if (error) {
                        console.log(error)
                        throw error
                    }
                })
                await client.query(`delete from public.sells where sells_id=$1`, [id], (error: Error, res: typeof QueryResult) => {
                    if (error) {
                        console.log(error)
                        throw error
                    }
                })
            })
            response.status(201).send(`Sell returned with sell ID: ${id}`)
        })
        return await client.query(`COMMIT;`)
    } catch (e) {
        await client.query(`ROLLBACK;`)
        console.log(e)
        throw (e)
    }
}
const createDetail = async (request: Express.Request, response: Express.Response) => {
    const { sells_id, ticket_id, quantity } = request.body
    try {
        await client.query(`BEGIN`)
        await client.query(`INSERT INTO public.detail ( sells_id, ticket_id, quantity ) VALUES ($1, $2, $3)`,
            [sells_id, ticket_id, quantity], async (error: Error, results: typeof QueryResult) => {
                if (error) {
                    console.log(error)
                    throw error
                }
                await client.query(`update ticket set quantity = ((select ti.quantity from ticket as ti where ticket_id=$1) - $2) where ticket_id=$1 `,
                    [ticket_id, quantity], (error: Error, res: typeof QueryResult) => {
                        if (error) {
                            console.log(error)
                            throw error
                        }
                        response.status(201).send(`Detail added with ticket id: ${results.rows[0].ticket_id} and quantity: ${results.rows[0].quantity}}`)
                    })
            })
        return await client.query(`COMMIT;`)
    } catch (e) {
        await client.query(`ROLLBACK;`)
        console.log(e)
        throw (e)
    }
}
const deleteSell = async (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    try {
        await client.query(`BEGIN`)
        await client.query(`DELETE FROM detail WHERE sells_id=$1`, [id],
            async (error: Error, results: typeof QueryResult) => {
                if (error) {
                    throw error
                }
                await client.query(`DELETE FROM sells WHERE sells_id = $1`, [id],
                    (error: Error, res: typeof QueryResult) => {
                        if (error) {
                            throw error
                        }
                        response.status(200).send(`Sell deleted with ID: ${id}`)
                    })
            })
        return await client.query(`COMMIT;`)
    } catch (error) {
        await client.query(`ROLLBACK;`)
        console.log(error)
        throw (error)
    }
}
export = {
    getSells, getSellsDetails, getDetails, getDetailsById, getSellsByUserId,
    getSaldo, createSell, returnSell, createDetail, deleteSell
}