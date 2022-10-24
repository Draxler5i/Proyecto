import { response } from "express";

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
// 
// settings
// app.set('port', process.env.port || 4000);


// middlewares
app.use(express.json());
module.exports = pool;

// Routes
app.get('/users', (req: any, res: any) => {

    pool.query('SELECT * FROM users', (error: any, result: any) => {
        if (error) throw error;
        res.send(result)
    });

    res.json(users);
});

app.post('/users', (req: any, res: any) => {

    pool.query('INSERT INTO users SET ?', req.body, (error: any, result: any) => {
        if (error) throw error;
        res.status(201).send(`User added with ID: ${result.insertId}`);
    })

    const user = req.body;
    users.push(user);
    res.json(user);
});

app.put('/users/:id', (req: any, res: any) => {

    const id = res.params.id;
        pool.query('UPDATE users SET ? WHERE id = ?', [req.body, id], (error: any, result: any) => {
          if (error) throw error;
           res.send('User updated successfully.');
      });

    const user = req.body;
    users.push(user);
    res.json(user);
});
app.delete('/users/:id', (req: any, res: any) => {

    const id = res.params.id;
    pool.query('DELETE FROM users WHERE id =?', id, (error: any, result: any) => {
        if (error) throw error;
        res.send('User delete sucessfully')
    })

    const userDeleted = users.pop();
    res.json(userDeleted);
});

// Starting the Server

// app.listen(app.get('port'), () => {
//     console.log(`Server on port`, app.get('port'));
// });

app.listen(port, () => {
    console.log(`Server on port`, port);
});