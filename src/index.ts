
import 'dotenv/config'
const express = require('express')
// Initializations
const userServices = require('./services/userServices')
const ticketServices = require('./services/ticketServices')
const app = express()
const port = process.env.PORT || 4005
app.use(express.json())
//Endpoints
app.get('/users', userServices.getUser)
app.post('/users', userServices.postUser)
app.put('/users/:id', userServices.putUser)
app.delete('/users/:id', userServices.deleteUser)
app.get('/tickets', ticketServices.getTicket)
app.post('/tickets', ticketServices.postTicket)
app.put('/tickets/:id', ticketServices.putTicket)
app.delete('/tickets/:id', ticketServices.deleteTicket)
app.listen(port, () => {
    console.log(`Server on port`, port)
})