const { QueryResult } = require(`pg`)
const client = require(`../postgres/connection`)
const ticket = require(`./ticket.service`)
const errors = require(`./errorMessages/errors`)

const getSellsDetails = async (_req: Express.Request, res: Express.Response) => {
    try {
        await client.query(`BEGIN`)
        const details: {
            sells_id: number, user_id: number, sell_date: string,
            detail: { detail_id: any, sells_id: any, ticket_id: any, quantity: any }[]
        }[] = []
        const all_sells = await client.query(`SELECT * from sells`)
        for (let index = 0; index < all_sells.rows.length; index++) {
            const sell_id = parseInt(all_sells.rows[index].sells_id)
            const all_details = await client.query(`SELECT * from detail where sells_id=$1`,
                [sell_id])
            details.push({
                sells_id: parseInt(all_sells.rows[index].sells_id),
                user_id: parseInt(all_sells.rows[index].user_id),
                sell_date: String(all_sells.rows[index].sells_id),
                detail: all_details.rows
            })
        }
        res.status(200).send(details)
        return await client.query(`COMMIT;`)
    } catch (e) {
        await client.query(`ROLLBACK;`)
        console.log(e)
        return res.status(400).send(errors.throw_error(errors.ERROR_GET('sell details')))
    }
}
const getSellsDetailsById = async (req: Express.Request, res: Express.Response) => {
    const id = parseInt(req.params.id)
    try {
        await client.query(`BEGIN`)
        const details: {
            sells_id: number, user_id: number, sell_date: string,
            detail: { detail_id: any, sells_id: any, ticket_id: any, quantity: any }[]
        }[] = []
        const sell = await client.query(`SELECT * from sells where sells_id=$1`, [id])
        console.log
        const all_details = await client.query(`SELECT * from detail where sells_id=$1`, [id])
        details.push({
            sells_id: id,
            user_id: sell.rows[0].user_id,
            sell_date: sell.rows[0].sell_date,
            detail: all_details.rows
        })
        res.status(200).send(details)
        return await client.query(`COMMIT;`)
    } catch (e) {
        await client.query(`ROLLBACK;`)
        console.log(e)
        return res.status(400).send(errors.throw_error(errors.ERROR_GET('sell details')))
    }
}
const getBalance = async (req: Express.Request, res: Express.Response) => {
    const user_id = parseInt(req.params.id)
    try {
        const balance = await client.query(`select sum(ca.saldo) as saldo from 
        creditCard as ca where ca.user_id=$1`, [user_id])
        if (parseFloat(balance.rows[0].saldo) > 0) {
            return res.status(200).send(`You have ${balance.rows[0].saldo} Bs.`)
        } else {
            return res.status(200).send(`There is NO enough balance to buy tickets. 
                    You have ${balance.rows[0].saldo} Bs.`)
        }
    } catch (e) {
        console.log(e)
        return res.status(400).send(errors.throw_error(errors.ERROR_MESSAGE('GET balance')))
    }
}
const createSell = async (req: Express.Request, res: Express.Response) => {
    const { user_id, sell_date, tickets } = req.body
    const arr: { ticket_id: number; quantity: number }[] = tickets
    const CREATE_SELL = errors.ERROR_MESSAGE('CREATE sell')
    const MAX = 10
    let total = 0
    let availableTicket = true
    if (!user_id || !sell_date || !tickets) {
        return res.status(400).send(errors.ERROR_VARIABLE)
    }
    for (let i = 0; i < arr.length; i++) {
        total += arr[i].quantity
        if (!ticket.getNumberOfTickets(arr[i].ticket_id, arr[i].quantity)) availableTicket = false
    }
    if (total >= MAX) {
        return res.send(`Quantity of tickets must not surpass 10.`)
    }
    if (availableTicket) {
        return res.send(`There are no enough tickets for the purchase.`)
    }
    try {
        //await client.query(`BEGIN`)
        const user = await client.query(`select * from public.user where user_id = $1`, [user_id])
        if (user.rowCount == 0) {
            return res.status(400).send(CREATE_SELL)
        }
        const sells = await client.query(`INSERT INTO public.sells ( user_id, sell_date ) VALUES ($1, $2) RETURNING *`,
            [user_id, sell_date])
        for (let index = 0; index < arr.length; index++) {
            await client.query(`INSERT INTO public.detail ( sells_id, ticket_id, quantity ) 
            VALUES ($1, $2, $3) RETURNING *`, [sells.rows[0].sells_id, arr[index].ticket_id, arr[index].quantity])
            await client.query(`update ticket set quantity = ((select ti.quantity from ticket as ti where ticket_id=$1)
             - $2) where ticket_id=$1 RETURNING *`, [arr[index].ticket_id, arr[index].quantity])
            const price = await client.query(`select price from ticket where ticket_id=$1`,
                [arr[index].ticket_id])
            await client.query(`UPDATE creditcard set saldo=((select ca.saldo from creditcard as ca where user_id= $1) 
            - (${price.rows[0].price} * ${arr[index].quantity})) where user_id=$1`, [user_id])
        }
        return res.status(201).send(`Sell added with sell date: ${sells.rows[0].sell_date}}`)
        //return await client.query(`COMMIT;`)
    } catch (e) {
        //await client.query(`ROLLBACK;`)
        console.log(e)
        return res.status(400).send(errors.throw_error(CREATE_SELL))
    }
}
const returnSell = async (req: Express.Request, res: Express.Response) => {
    const id = parseInt(req.params.id)
    const RETURN_SELL = errors.ERROR_MESSAGE('RETURN sell')
    try {
        await client.query(`BEGIN`)
        const sells = await client.query(`select * from public.sells where sells_id = $1`, [id])
        if (sells.rowCount == 0) {
            return res.status(400).send(RETURN_SELL)
        }
        await client.query(`UPDATE creditcard set saldo=((select ca.saldo from creditcard as ca where user_id= 
                (select user_id from sells where sells_id=$1)) + (select sum(d.quantity*ti.price) as amount 
                from public.detail as d, ticket as ti where d.sells_id=$1 and ti.ticket_id=d.ticket_id)) 
                where user_id=(select user_id from sells where sells_id=$1)`, [id])
        const detail = await client.query(`select ticket_id, quantity from public.detail as d, sells 
        where d.sells_id=sells.sells_id and sells.sells_id=$1`, [id])
        for (let i = 0; i < detail.rows.length; i++) {
            await client.query(`update ticket set quantity = ((select ti.quantity from ticket as ti 
            where ticket_id=$1) + $2) where ticket_id=$1`, [detail.rows[i].ticket_id, detail.rows[i].quantity])
        }
        await client.query(`delete from public.detail where sells_id=$1`, [id])
        await client.query(`delete from public.sells where sells_id=$1`, [id])
        res.status(200).send(`Sell returned with sell ID: ${id}`)
        return await client.query(`COMMIT;`)
    } catch (e) {
        await client.query(`ROLLBACK;`)
        console.log(e)
        return res.status(400).send(errors.throw_error(RETURN_SELL))
    }
}
const returnMoneyUser = async (req: Express.Request, res: Express.Response) => {
    const id = parseInt(req.params.id)
    const RETURN_SELL = errors.ERROR_MESSAGE('RETURN sell')
    try {
        await client.query(`select * from public.user where user_id = $1`,
            [id], async (error: Error, results: typeof QueryResult) => {
                if (error) {
                    return res.status(400).send(RETURN_SELL)
                }
                if (results.rowCount == 0) {
                    return res.status(400).send(RETURN_SELL)
                }
                await client.query(`UPDATE creditcard set saldo=((select ca.saldo from creditcard as ca where user_id= $1)
                 + (select sa.total from (select (sum(retsell.price * retsell.sell_quantity)*0.87) as total from
                     (select * from (select sells.sells_id, sells.user_id, sells.sell_date,
                    detail.ticket_id, detail.quantity as sell_quantity from sells left join detail
                    on sells.sells_id= detail.sells_id where sells.user_id=$1) as sell
                    left join ticket on ticket.ticket_id=sell.ticket_id	) as retsell) as sa)) where user_id=$1`, [id])
                const sells = await client.query(`select sells_id from sells where user_id=$1`, [id])
                for (let i = 0; i < sells.rows.length; i++) {
                    const details = await client.query(`select * from public.detail where sells_id=$1`, [sells.rows[i].sells_id])
                    for (let j = 0; j < details.length; j++) {
                        await client.query(`update ticket set quantity = ((select ti.quantity from ticket as ti 
                            where ticket_id=$1) + $2) where ticket_id=$1`,
                            [details.rows[j].ticket_id, details.rows[j].quantity])
                    }
                    await client.query(`delete from public.detail where sells_id=$1`, [sells.rows[i].sells_id])
                    await client.query(`delete from public.sells where sells_id=$1`, [sells.rows[i].sells_id])
                }
                return res.status(200).send(`All sells have been returned as the money for user ID: ${id}`)
            })
    } catch (e) {
        console.log(e)
        return res.status(400).send(errors.throw_error(RETURN_SELL))
    }
}
const deleteSell = async (req: Express.Request, res: Express.Response) => {
    const id = parseInt(req.params.id)
    const DELETE_SELL_ERROR = errors.ERROR_MESSAGE('CREATE detail')
    try {
        await client.query(`BEGIN`)
        await client.query(`DELETE FROM detail WHERE sells_id=$1`, [id])
        await client.query(`DELETE FROM sells WHERE sells_id = $1`, [id])
        res.status(200).send(`Sell deleted with ID: ${id}`)
        return await client.query(`COMMIT;`)
    } catch (e) {
        await client.query(`ROLLBACK;`)
        console.log(e)
        return res.status(400).send(errors.throw_error(DELETE_SELL_ERROR))
    }
}

export = {
    getSellsDetails, getBalance, createSell, returnSell, deleteSell,
    returnMoneyUser, getSellsDetailsById
}