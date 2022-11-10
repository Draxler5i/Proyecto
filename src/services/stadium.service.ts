const { QueryResult } = require(`pg`)
const client = require(`../postgres/connection`)

const ERROR_MESSAGE = (e: string) => `An error occured when trying to ${e} a stadium`
const ERROR_VARIABLE = 'Missing parameters. Please make sure to fullfill all required fields'
const ERROR_GET = 'A problem occured when trying to obtain list of stadiums'

const getStadiums = async (_req: Express.Request, res: Express.Response) => {
    try {
        await client.query(`SELECT * from stadium`, (error: Error, result: typeof QueryResult) => {
            if (error) {
                return res.status(400).send(ERROR_GET)
            }
            return res.status(200).json(result[`rows`])
        })
    } catch (e) {
        console.log(e)
        return res.status(400).send(ERROR_GET)
    }
}
const createStadium = async (req: Express.Request, res: Express.Response) => {
    const { stadium_name, address } = req.body
    const ERROR_STADIUM = ERROR_MESSAGE('CREATE')
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
        return res.send({
            status: 'FAILED',
            data: e
        })
    }
}
const updateStadium = async (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    const { stadium_name, address } = request.body
    try {
        await client.query(`UPDATE stadium SET stadium_name = $1, address = $2 WHERE stadium_id = $3`,
            [stadium_name, address, id], (error: Error, results: typeof QueryResult) => {
                if (error) {
                    throw error
                }
                response.status(200).send(`Stadium modified with stadium name: ${stadium_name}, 
            address: ${address}`)
            })
    } catch (error) {
        console.log(error)
        throw (error)
    }
}
const deleteStadium = async (request: Express.Request, response: Express.Response) => {
    const id = parseInt(request.params.id)
    try {
        await client.query(`DELETE FROM stadium WHERE stadium_id = $1`, [id],
            (error: Error, results: typeof QueryResult) => {
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

export = {
    getStadiums, createStadium, updateStadium, deleteStadium
}