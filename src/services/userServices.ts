const pool = require('../db_conn/dbconn')
const getUser = async (req: any, res: any) => {

    try {
        await pool.query('SELECT * FROM user', (error: any, results: any, fields: any) => {
            if (error) throw error;
            res.status(200).send(results)
        });
    } catch (error) {
        throw (error)
    }
}
const putUser = async (req: any, res: any) => {
    const id = req.params.id;
    const { name, email, cellphone, age, address, country, state } = req.body
    if (!id) {
        throw res.status(400)
    }
    try {
        await pool.query('UPDATE user SET name=?, email=?, cellphone=?, age=?, address=?, country=?, state=? WHERE user_id = ?', [name, email, cellphone, age, address, country, state, id], (error: any, result: any) => {
            if (error) throw error;
            res.status(200).send(`User updated successfully with name: ${name}, email:${email}, cellphone:${cellphone}, age=${age}, address:${address}, country:${country}, state:${state}`);
        })
    } catch (error) {
        throw (error)
    }

}
const postUser = async (req: any, res: any) => {
    const { name, email, cellphone, age, address, country, state } = req.body
    try {
        await pool.query('INSERT INTO user (name, email, cellphone, age, address, country, state) values(?, ?,?,?,?,?,?)', [name, email, cellphone, age, address, country, state], (error: any, result: any) => {
            if (error) throw error;
            res.status(201).send(`User added with ID: ${result.insertId}, name:${name}, email:${email}, cellphone:${cellphone}, age:${age}, address:${address}, country:${country}, state:${state}`);
        });
    } catch (error) {
        throw (error)
    }
}
const deleteUser = async (req: any, res: any) => {
    const id = req.params.id;
    if (!id) {
        throw res.status(400)
    }
    try {
        await pool.query('DELETE FROM user WHERE user_id =?', id, (error: any, result: any) => {
            if (error) throw error;
            res.status(200).send(`User wih id ${id} delete sucessfully `)
        })
    } catch (error) {
        throw (error)
    }
}
module.exports = {
    getUser,
    putUser,
    postUser,
    deleteUser
}