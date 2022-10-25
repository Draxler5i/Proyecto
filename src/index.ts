import express, { query, response } from 'express';
import { Pool, QueryResult } from 'pg';
// Initializations
const app = express();
const users: any = [];
const { Client } = require('pg')
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'bd_users',
    password: 'qwerty',
    port: 5432
})
client.connect()

const getUsers = async (request: any, response: any) => {
    await client.query('SELECT * from users', (error: any, result: any) => {
        if (error) {
            throw error
        }
        response.status(200).json(result.rows)
        client.end()
    })
}
const createUser = async (request: any, response: any) => {
    const { username, lastname, age, city } = request.body

    await client.query('INSERT INTO users (username, lastname, age, city) VALUES ($1, $2, $3, $4) RETURNING *', [username, lastname, age, city], (error: any, results: any) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.rows[0].userid}`)
    })
}
const updateUser = async (request: any, response: any) => {
    const id = parseInt(request.params.id)
    const { username, lastname, age, city } = request.body

    await client.query('UPDATE users SET username = $1, lastname = $2, age = $3, city= $4 WHERE userid = $5', [username, lastname, age, city, id], (error: any, results: any) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
    }
    )
}
const deleteUser = (request: any, response: any) => {
    const id = parseInt(request.params.id)
    client.query('DELETE FROM users WHERE userid = $1', [id], (error: any, results: any) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}


app.set('port', 4000);

// middlewares
app.use(express.json());
app.get('/users', getUsers);
app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);
/*app.post('/users', (req: any, res: any) => {
    const user = req.body;
    users.push(user);
    res.json(user);
});
app.put('/users/:id', (req: any, res: any) => {
    const user = req.body;
    users.push(user);
    res.json(user);
});
app.delete('/users/:id', (req: any, res: any) => {
    const userDeleted = users.pop();
    res.json(userDeleted);

});
*/
// Starting the Server
app.listen(app.get('port'), () => {
    console.log(`Server on port`, app.get('port'));
});