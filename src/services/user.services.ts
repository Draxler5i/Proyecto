const pool = require('../database/connection')

const getUsers = async () => {
    try {
        return await pool.query('SELECT * FROM user')
    } catch (error) {
        console.log(`something go wrong get userService ${error}`);
        throw (error)
    }
}

const getuserById = async (id: number) => {
    try {
        return await pool.query('SELECT * FROM users WHERE id_users=?', id)
    } catch (error) {
        console.log(`Something go wrong get user service ${error}`);
        throw (error)
    }
}

const putUser = async (user: {
    name?: string,
    email?: string,
    cellphone?: number,
    age?: number,
    address?: string,
    country?: string,
    state?: boolean,
}, id: number) => {
    try {
        const userUpdate = await pool.query(
            'UPDATE user SET name=?, email=?, cellphone=?, age=?, address=?, country=?, state=? WHERE user_id = ?',
            [
                user.name,
                user.email,
                user.cellphone,
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
    email: string,
    cellphone: number,
    age: number,
    address: string,
    country: string,
    state: boolean
}) => {
    try {
        const postUser = await pool.query(
            'INSERT INTO user (name, email, cellphone, age, address, country, state) values(?, ?,?,?,?,?,?)',
            [user.name,
            user.email,
            user.cellphone,
            user.age,
            user.address,
            user.country,
            user.state],
        )
        return postUser
    } catch (error) {
        console.log(`Something go wrong post User Service ${error}`);
        throw (error)
    }
}

const deleteUser = async (id: number) => {
    try {
        const userDelete = await pool.query('DELETE FROM user WHERE user_id =?', id)
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
    getuserById
}