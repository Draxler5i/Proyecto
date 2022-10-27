import express from 'express'
import 'dotenv/config'
const services = require('./services/service')
const session = require('express-session');

const app = express()
const PORT = process.env.SERVER_PORT || 4001
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.json())
app.get('/users', services.getUsers)
app.get('/ticket', services.getTicket)
app.post('/users', services.createUser)
app.post('/ticket', services.createTicket)
app.put('/users/:id', services.updateUser)
app.put('/ticket/:id', services.updateTicket)
app.delete('/users/:id', services.deleteUser)
app.delete('/ticket/:id', services.deleteTicket)
app.post('/v1/login', services.login)
app.get('/home', services.home)

app.listen(PORT, () => {
    console.log(`Server on port`, PORT)
});