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
app.get('/stadium', auth, services.getStadiums)
app.get('/sells', auth, services.getSells)
app.post('/users', auth, services.createUser)
app.post('/ticket', auth, services.createTicket)
app.post('/stadium', auth, services.createStadiium)
app.post('/sells', auth, services.createSells)
app.put('/users/:id', auth, services.updateUser)
app.put('/ticket/:id', auth, services.updateTicket)
app.put('/stadium/:id', auth, services.updateStadum)
app.put('/sells/:id', auth, services.updateSell)
app.delete('/users/:id', auth, services.deleteUser)
app.delete('/ticket/:id', auth, services.deleteTicket)
app.delete('/stadium/:id', auth, services.deleteStadium)
app.delete('/sells/:id', auth, services.deleteSell)
app.post('/v1/login', services.login)
app.get('/home', auth, services.home)
app.post("/welcome", auth, services.welcome)
app.listen(PORT, () => {
  console.log(`Server on port`, PORT)
})