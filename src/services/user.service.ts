const client = require('../database/conection')

const getUsers = async () => {
    try {
        const res = await client.query(
            "SELECT * FROM users;"
        )
        return res.rows;
    } catch (error) {
        throw error
    }
}

const postUsers = async (newUser:any) => {
    try {
        const res = await client.query(
            "INSERT INTO users (name_user, age) VALUES ($1, $2);",
            [newUser.name, newUser.age]
        )
        return res 
    } catch (error) {
        throw error
    }
}

const updateUsers = async (user:any) => {
    const { name, age, id } = user
    try {
        const res = await client.query(
            "UPDATE users SET name_user=$1, age=$2 WHERE id_user=$3",
            [name, age, id]
        )
        return res
    } catch (error) {
        throw error
    }
}

const deleteUsers = async (id:any) => {
    try {
        const res = client.query(
            "DELETE FROM users WHERE id_user = $1",
            [id]
        )
        return res
    } catch (error) {
        throw error
    }
}
module.exports = {
    getUsers, 
    postUsers, 
    updateUsers, 
    deleteUsers,

}