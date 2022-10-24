import express, { response } from 'express';

// Initializations
const app = express();
const { Client } = require('pg')
const users: any = [];

// settings
app.set('port', 4000);

// middlewares
app.use(express.json());

// Routes
app.get('/users', (req: any, res: any) => {
    res.json(users);
});
app.post('/users', (req: any, res: any) => {
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

// Starting the Server
app.listen(app.get('port'), () => {
    console.log(`Server on port`, app.get('port'));
});