import pool from "../database/connection";
import creditCardService from "./creditCard.service";

const getUsers = async () => {
    try {
        return await pool.query('SELECT * FROM users')
    } catch (error) {
        console.log(`something go wrong get userService ${error}`);
        throw (error)
    }
}

const existentUserByName = async (name: string) => {
    try {
        const user = await pool.query('SELECT count(*) FROM users WHERE user_name=$1 ', [name])
        return Number(user.rows[0].count);
    } catch (error) {        
        console.log(`Something go wrong get user service ${error}`);
        throw (error)
    }
}

const getuserById = async (id: number) => {
    try {
        return await pool.query('SELECT * FROM users WHERE id_users=$1', [id])
    } catch (error) {
        console.log(`Something go wrong get user service ${error}`);
        throw (error)
    }
}

const putUser = async (
    user:
        {
            name?: string,
            password?: string,
            cellphone?: number,
            age?: number,
            address?: string,
            country?: string,
            state?: boolean,
        },
    id: number) => {
    try {
        const userUpdate = await pool.query(
            'UPDATE user SET user_name=$1, user_password=$2, cellphone=$3, age=$4, address=$5, country=$6, state=$7 WHERE user_id = $7',
            [
                user.name,
                user.cellphone,
                user.password,
                user.age,
                user.address,
                user.country,
                user.state,
                id
            ]
        )
        return userUpdate;
    } catch (error) {
        console.log(`something go wrong update the user ${error}`);
        throw (error)
    }
}

const postUser = async (user: {
    name: string,
    password: string,
    cellphone: number,
    age: number,
    address: string,
    country: string,
    state: boolean
},
card:{
    credit_name: string,
    credit_number: number,
    cvv: number
    expiration_date: Date,
    balance: number
}
) => {
    try {
        await pool.query('BEGIN')
        const postUsers = await pool.query('INSERT INTO users (user_name, user_password,  cellphone, age, address, country, state) values($1,$2, $3,$4,$5,$6,$7) RETURNING id_users',
            [
                user.name,
                user.password,
                user.cellphone,
                user.age,
                user.address,
                user.country,
                user.state
            ],
        )
        await creditCardService.postCreditCard(card,postUsers.rows[0].id_users )
        return await pool.query('COMMIT')
    } catch (error) {
        await pool.query('ROLLBACK')
        console.log(`Something go wrong post User Service ${error}`);
        throw (error)
    }
}

const deleteUser = async (id: number) => {
    try {
        const userDelete = await pool.query('DELETE FROM user WHERE user_id =$1', [id])
        return userDelete
    } catch (error) {
        console.log(`Something go wrong delete user service ${error}`);
        throw (error)
    }
}

export = {
    getUsers,
    putUser,
    postUser,
    deleteUser,
    getuserById,
    existentUserByName
}