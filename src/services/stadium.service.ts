const pool = require('../database/connection')

const getStadium = async () => {
    try {
        return await pool.query('SELECT * FROM stadium')
    } catch (error) {
        console.log(`something go wrong get stadium service ${error}`);
        throw (error)
    }
}

const putStadium = async (stadium: {
    name: string,
    capacity: number,
    id: number
}) => {
    try {
        const updateStadium = await pool.query
            ('UPDATE stadium set name=$1,capacity=$2 WHERE id_stadium=$3',
                [
                    stadium.name,
                    stadium.capacity,
                    stadium.id
                ]
            )
        return updateStadium
    } catch (error) {
        console.log(`something go wrong update the stadium ${error}`);
        throw (error)
    }
}

const postStadium = async (stadium: {
    name: string,
    capacity: number,
}) => {
    try {
        const postStadiums = await pool.query('INSERT INTO stadium (stadium_name, capacity) values($1 , $2)',
                [
                    stadium.name,
                    stadium.capacity
                ]
            )
        return postStadiums;
    } catch (error) {
        console.log(`something go wrong post the stadium service ${error}`);
        throw (error)
    }
}

const deleteStadium = async (id: number) => {
    try {
        const stadiumDelete = await pool.query('DELETE FROM stadium WHERE id_stadium =$1', [id])
        return stadiumDelete
    } catch (error) {
        console.log(`Something go wrong delete stadium service ${error}`);
        throw (error)
    }
}

const getStadiumCapacity = async (id: number) => {
    try {
        const stadiumCapacity = await pool.query('SELECT capacity FROM stadium WHERE id_stadium=?', [id])
        return stadiumCapacity
    } catch (error) {
        console.log(`Something go wrong getStadium stadium service ${error}`);
        throw (error)
    }
}

export = {
    getStadium,
    putStadium,
    postStadium,
    deleteStadium,
    getStadiumCapacity
}