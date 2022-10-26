
const express = require('express')
const mysql = require('mysql')
import 'dotenv/config'
// Initializations
const app = express();
const pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mundial'
})
const port = 4000

// middlewares
app.use(express.json());

const getUser = (req: any, res: any) => {
    res.send('heloooo')

    pool.query('SELECT * FROM user', (error: any, results: any, fields: any) => {
        // When done with the connection, release it.
        //connection.release();
        res.send(results)

        // Handle error after the release.
        if (error) throw error;

        // Don't use the connection here, it has been returned to the pool.
    });


    /*
    res.send('holiiiii xd')
    //try {
    pool.getConnection((err: any, connection: any) => {
        if (err) throw err;
        pool.query('SELECT * FROM mundial.ticket', (error: Error, result: any) => {
            //res.send(result['rows'])
            if (error) throw error;
            res.status(200).json("ressss")
 
        })
    });
    /* } catch (error) {
         throw (error)
     }*/


}
app.get('/users', getUser)
/*
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
    const deleteUser = async () => {
        await pool.query('DELETE FROM users WHERE id =?', id, (error: any, result: any) => {
            if (error) throw error;
            res.status(200).send('User delete sucessfully')
        })
    }
});*/

app.listen(port, () => {
    console.log(`Server on port`, port);
});