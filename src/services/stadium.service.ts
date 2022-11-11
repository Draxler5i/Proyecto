const { QueryResult } = require(`pg`)
const client = require(`../postgres/connection`)
const errors = require(`./errorMessages/errors`)

const getStadiums = async (_req: Express.Request, res: Express.Response) => {
    try {
        const stadiums = await client.query(`SELECT * from stadium`)
        return res.status(200).json(stadiums.rows)
    } catch (e) {
        console.log(e)
        return res.status(400).send(errors.throw_error(errors.ERROR_GET('stadiums')))
    }
}
const createStadium = async (req: Express.Request, res: Express.Response) => {
    const { stadium_name, address } = req.body
    const ERROR_STADIUM = errors.ERROR_MESSAGE('CREATE a stadium')
    if (!stadium_name || !address) {
        return res.status(400).send(errors.ERROR_VARIABLE)
    }
    try {
        const stadium = await client.query(`INSERT INTO public.stadium ( stadium_name, address ) 
        VALUES ($1, $2) RETURNING *`, [stadium_name, address])
        return res.status(201).send(`Stadium added with stadium_name: ${stadium.stadium_name}, 
        stadium address: ${stadium.address}`)
    } catch (e) {
        console.log(ERROR_STADIUM)
        return res.send(errors.throw_error(ERROR_STADIUM))
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
        const stadium = await client.query(`select * from public.stadium where stadium_id = $1`, [id])
        if (stadium.rowCount == 0) {
            return res.status(400).send(UPDATE_STADIUM_ERROR)
        }
        await client.query(`UPDATE stadium SET stadium_name = $1, address = $2 WHERE stadium_id = $3`,
            [stadium_name, address, id])
        return res.status(200).send(`Stadium modified with stadium name: ${stadium_name}, address: ${address}`)
    } catch (e) {
        console.log(e)
        return res.send(errors.throw_error(UPDATE_STADIUM_ERROR))
    }
}
const deleteStadium = async (req: Express.Request, res: Express.Response) => {
    const id = parseInt(req.params.id)
    const DELETE_ERROR = errors.ERROR_MESSAGE('DELETE stadium')
    try {
        const stadiums = await client.query(`select * from public.stadium where stadium_id = $1`, [id])
        if (stadiums.rowCount == 0) {
            return res.status(400).send(DELETE_ERROR)
        }
        await client.query(`DELETE FROM stadium WHERE stadium_id = $1`, [id])
        return res.status(200).send(`Stadium deleted with ID: ${id}`)

    } catch (e) {
        console.log(e)
        return res.send(errors.throw_error(DELETE_ERROR))
    }
}

export = {
    getStadiums, createStadium, updateStadium, deleteStadium
}