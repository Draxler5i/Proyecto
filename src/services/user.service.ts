import client from '../database/conection'

const getUsers = async () => {
    try {
        const res = await client.query(
            "SELECT * FROM users;"
        )
        return res.rows
    } catch (error) {
        console.error(`Some wrong in getUsers service: ${error}`)
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
        console.error(`Some wrong in getOneUser service: ${error}`)
        throw error
    }
}

const postUsers = async (user: { name:string, age:number, email:string, password:string, birthday:Date, created:Date, lastname:string },
                         card: { nameCard:string, expiration:Date, created:Date, balance:number, cvv:number, cardNumber:string }) => {
    try {
        await client.query("BEGIN;")
        const resUser = await client.query(
            "INSERT INTO users (name_user, age, email, password, birthday, created, lastname) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_user;",
            [user.name, user.age, user.email, user.password, user.birthday, user.created, user.lastname]
        )
        await client.query(
            "INSERT INTO creditcard (name_card, expiration, created, balance, cvv, number, id_user) VALUES ($1,$2,$3,$4,$5,$6,$7);",
            [card.nameCard, card.expiration, card.created, card.balance, card.cvv, card.cardNumber, resUser.rows[0].id_user]
        )
        return await client.query("COMMIT;")
    } catch (error) {
        await client.query("ROLLBACK;")
        console.error(`Some wrong in postUsers service: ${error}`)
        throw error
    }
}

const updateUsers = async (user: { name?:string, age?:number, email?:string, password?:string, birthday?:Date, lastname?:string, id:number }) => {
    try {
        const res = await client.query(
            "UPDATE users SET name_user=$1, age=$2, email=$3, password=$4, birthday=$5, lastname=$6 WHERE id_user=$7;",
            [user.name, user.age, user.email, user.password, user.birthday, user.lastname, user.id]
        )
        return res
    } catch (error) {
        console.error(`Some wrong in updateUsers service: ${error}`)
        throw error
    }
}

const deleteUsers = async (id:number) => {
    try {
        const res = await client.query(
            "DELETE FROM users WHERE id_user = $1;",
            [id]
        )
        return res
    } catch (error) {
        console.error(`Some wrong in deleteUsers service: ${error}`)
        throw error
    }
}

const existUser = async (email:string) => {
    try {
        const res = await client.query(
            "SELECT * FROM users WHERE email = $1;",
            [email]
        )
        return res.rows
    } catch (error) {
        console.error(`Some wrong in existUser service: ${error}`)
        throw error
    }   
}

const getTicketsPurchased = async (idUser:number) => {
    try {
        const res = await client.query(
            "SELEC count(*) FROM user_ticket WHERE id_user=$1;",
            [idUser]
        )
        return res.rows[0]
    } catch (error) {
        console.error(`Some wrong in getTIcketsPurchased service: ${error}`)
        throw error
    }
}

export = {
    getUsers, 
    getOneUser,
    postUsers, 
    updateUsers, 
    deleteUsers,
    existUser,
    getTicketsPurchased
}