const { QueryResult } = require(`pg`)
const client = require(`../postgres/connection`)
const errors = require(`./errorMessages/errors`)

const getStadiums = async (_req: Express.Request, res: Express.Response) => {
    try {
        await client.query(`SELECT * from stadium`, (error: Error, result: typeof QueryResult) => {
            if (error) {
                return res.status(400).send(errors.ERROR_GET)
            }
            return res.status(200).json(result.rows)
        })
    } catch (e) {
        console.log(e)
        return res.send(errors.throw_error(e))
    }
}
const createStadium = async (req: Express.Request, res: Express.Response) => {
    const { stadium_name, address } = req.body
    const ERROR_STADIUM = errors.ERROR_MESSAGE('CREATE a stadium')
    if (!stadium_name || !address) {
        return res.status(400).send(errors.ERROR_VARIABLE)
    }
    try {
        await client.query(`INSERT INTO public.stadium ( stadium_name, address ) VALUES ($1, $2)`,
            [stadium_name, address], (error: Error, results: typeof QueryResult) => {
                if (error) {
                    return res.status(400).send(ERROR_STADIUM)
                }
                return res.status(201).send(`Stadium added with stadium_name: ${stadium_name}, 
                stadium address: ${address}`)
            })
    } catch (e) {
        console.log(ERROR_STADIUM)
        return res.send(errors.throw_error(e))
    }
}
const updateStadium = async (req: Express.Request, res: Express.Response) => {
    const id = parseInt(req.params.id)
    const { stadium_name, address } = req.body
    const UPDATE_STADIUM_ERROR = errors.ERROR_MESSAGE('UPDATE the user')
    if (!stadium_name || !address) {
        return res.status(400).send(errors.ERROR_VARIABLE)
    }
    try {
        await client.query(`select * from public.stadium where stadium_id = $1`,
            [id], async (error: Error, results: typeof QueryResult) => {
                if (error) {
                    return res.status(400).send(UPDATE_STADIUM_ERROR)
                }
                if (results.rowCount == 0) {
                    return res.status(400).send(UPDATE_STADIUM_ERROR)
                }
                await client.query(`UPDATE stadium SET stadium_name = $1, address = $2 WHERE stadium_id = $3`,
                    [stadium_name, address, id], (error: Error, results: typeof QueryResult) => {
                        if (error) {
                            return res.status(400).send(UPDATE_STADIUM_ERROR)
                        }
                        return res.status(200).send(`Stadium modified with stadium name: ${stadium_name}, 
                address: ${address}`)
                    })
            })
    } catch (e) {
        console.log(e)
        return res.send(errors.throw_error(e))
    }
}
const deleteStadium = async (req: Express.Request, res: Express.Response) => {
    const id = parseInt(req.params.id)
    const DELETE_ERROR = errors.ERROR_MESSAGE('DELETE stadium')
    try {
        await client.query(`select * from public.stadium where stadium_id = $1`,
            [id], async (error: Error, results: typeof QueryResult) => {
                if (error) {
                    return res.status(400).send(DELETE_ERROR)
                }
                if (results.rowCount == 0) {
                    return res.status(400).send(DELETE_ERROR)
                }
                await client.query(`DELETE FROM stadium WHERE stadium_id = $1`, [id],
                    (error: Error, results: typeof QueryResult) => {
                        if (error) {
                            return res.status(400).send(DELETE_ERROR)
                        }
                        return res.status(200).send(`Stadium deleted with ID: ${id}`)
                    })
            })
    } catch (e) {
        console.log(e)
        return res.send(errors.throw_error(e))
    }
}

export = {
    getStadiums, createStadium, updateStadium, deleteStadium
}