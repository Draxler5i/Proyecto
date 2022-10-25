
const express = require('express')
const conexion = require('mysql')

// Initializations
const app = express();
require('dotenv').config();
const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    dataBase: 'apiTest',
};

const pool = conexion.createPool(config);
const users: string[] = [];
const port = process.env.PORT

// middlewares
app.use(express.json());

// Routes
app.get('/users', (req: any, res: any) => {

    const getUsers = async () => {
        await pool.query('SELECT * FROM useres', (error: any, result: any) => {
            if (error) throw error;
            res.status(200).send(result)
        });
    }

});
app.post('/users', (req: any, res: any) => {

    const sendUsers = async () => {
        await pool.query('INSERT INTO users SET ?', req.body, (error: any, result: any) => {
            if (error) throw error;
            res.status(201).send(`User added with ID: ${result.insertId}`);
        });
    }
});

app.put('/users/:id', (req: any, res: any) => {
    const id = res.params.id;
    if (!id) {
        throw res.status(400)
    }
    const sendUser = async () => {
       await pool.query('UPDATE users SET ? WHERE id = ?', [req.body, id], (error: any, result: any) => {
            if (error) throw error;
            res.status(200).send('User updated successfully.');
        })
    }
});
app.delete('/users/:id', (req: any, res: any) => {
    const id = res.params.id;
    if (!id) {
        throw res.status(400)
    }
    const deleteUser=async () => {
        await pool.query('DELETE FROM users WHERE id =?', id, (error: any, result: any) => {
            if (error) throw error;
            res.status(200).send('User delete sucessfully')
        }) 
    }
});

app.listen(port, () => {
    console.log(`Server on port`, port);
});