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
app.post('/users', userServices.createUser)
app.put('/users/:id', userServices.updateUser)
app.delete('/users/:id', userServices.deleteUser)

// Starting the Server
app.listen(PORT, () => {
    console.log(`Server on port`, PORT)
});