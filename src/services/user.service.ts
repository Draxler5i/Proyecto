import client from '../database/conection'

const getUsers = async () => {
    try {
        const res = await client.query(
            "SELECT * FROM users;"
        )
        return res.rows
    } catch (error) {
        throw error
    }
}

const getOneUser = async (id:number) => {
    try {
        const res = await client.query(
            "SELECT * FROM users WHERE id_user=$1;",
            [id]
        )
        return res.rows
    } catch (error) {
        throw error
    }
}

const postUsers = async (user: {name:string, age:number, email:string, password:string, birthday:Date, created:Date, lastname:string}) => {
    try {
        const res = await client.query(
            "INSERT INTO users (name_user, age, email, password, birthday, created, lastname) VALUES ($1, $2, $3, $4, $5, $6, $7);",
            [user.name, user.age, user.email, user.password, user.birthday, user.created, user.lastname]
        )
        return res 
    } catch (error) {
        throw error
    }
}

const updateUsers = async (user: {name:string, age:number, email:string, password:string, birthday:Date, lastname:string, id:number}) => {
    try {
        const res = await client.query(
            "UPDATE users SET name_user=$1, age=$2, email=$3, password=$4, birthday=$5, lastname=$6 WHERE id_user=$7",
            [user.name, user.age, user.email, user.password, user.birthday, user.lastname, user.id]
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
export = {
    getUsers, 
    getOneUser,
    postUsers, 
    updateUsers, 
    deleteUsers,
}