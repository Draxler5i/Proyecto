import express from 'express'
import 'dotenv/config'
//initializations
const services = require('./services/service')
const session = require('express-session')
const auth = require("./jwt/auth")
const app = express()
const PORT = process.env.SERVER_PORT || 4001
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
app.use(express.json())
app.get('/users', auth, services.getUsers)
app.get('/ticket', auth, services.getTicket)
app.post('/users', auth, services.createUser)
app.post('/ticket', auth, services.createTicket)
app.put('/users/:id', auth, services.updateUser)
app.put('/ticket/:id', auth, services.updateTicket)
app.delete('/users/:id', auth, services.deleteUser)
app.delete('/ticket/:id', auth, services.deleteTicket)
app.post('/v1/login', services.login)
app.get('/home', auth, services.home)
app.post("/welcome", auth, services.welcome)
app.listen(PORT, () => {
  console.log(`Server on port`, PORT)
})