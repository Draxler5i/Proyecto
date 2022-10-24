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

const postUsers = async (user: {name:string, age:number}) => {
    try {
        const res = await client.query(
            "INSERT INTO users (name_user, age) VALUES ($1, $2);",
            [user.name, user.age]
        )
        return res 
    } catch (error) {
        throw error
    }
}

const updateUsers = async (user:{ name:string, age:number, id:number}) => {
    try {
        const res = await client.query(
            "UPDATE users SET name_user=$1, age=$2 WHERE id_user=$3",
            [user.name, user.age, user.id]
        )
        return res
    } catch (error) {
        throw error
    }
}

const deleteUsers = async (id:number) => {
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