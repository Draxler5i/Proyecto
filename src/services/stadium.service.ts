const { QueryResult } = require('pg')
const client = require('../postgres/connection')

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
export = {
    getStadiums, createStadium, updateStadum, deleteStadium
}