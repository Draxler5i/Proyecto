import express from 'express'
import 'dotenv/config'
import { QueryResult } from 'pg'
const userServices = require('./services/service')

// Initializations
const app = express()
const PORT = process.env.SERVER_PORT || 4001

// middlewares
app.use(express.json())
app.get('/users', userServices.getUsers)
app.get('/ticket', userServices.getTicket)
app.post('/users', userServices.createUser)
app.post('/ticket', userServices.createTicket)
app.put('/users/:id', userServices.updateUser)
app.put('/ticket/:id', userServices.updateTicket)
app.delete('/users/:id', userServices.deleteUser)
app.delete('/ticket/:id', userServices.deleteTicket)

// Starting the Server
app.listen(PORT, () => {
    console.log(`Server on port`, PORT)
});