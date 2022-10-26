import express from 'express'
import 'dotenv/config'
import {getUsers, getTicket, createUser, createTicket, updateUser, updateTicket, deleteUser, deleteTicket} from './services/service'

const app = express()
const PORT = process.env.SERVER_PORT || 4001

app.use(express.json())
app.get('/users', getUsers)
app.get('/ticket', getTicket)
app.post('/users', createUser)
app.post('/ticket', createTicket)
app.put('/users/:id', updateUser)
app.put('/ticket/:id', updateTicket)
app.delete('/users/:id', deleteUser)
app.delete('/ticket/:id', deleteTicket)

app.listen(PORT, () => {
    console.log(`Server on port`, PORT)
});