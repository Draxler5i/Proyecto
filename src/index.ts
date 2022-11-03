require('dotenv').config()
const express = require('express')
const services = require('./services/service')
const session = require('express-session')
const auth = require('./jwt/auth')
const app = express()
const PORT = process.env.SERVER_PORT || 4001

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

app.use(express.json())
app.get('/v1/users', auth, services.getUsers)
app.get('/v1/ticket', auth, services.getTicket)
app.get('/v1/stadium', auth, services.getStadiums)
app.get('/v1/sells', auth, services.getSells)
app.get('/v1/saldo', auth, services.getSaldo)
app.get('/v1/details', services.getDetails)
//app.get('/v1/selldetails', services.getSellsDetails)
app.get('/v1/details/:id', auth, services.getDetailsById)
app.get('/v1/sells/:id', auth, services.getSellsByUserId)
app.post('/v1/users', auth, services.createUser)
app.post('/v1/ticket', auth, services.createTicket)
app.post('/v1/stadium', auth, services.createStadium)
app.post('/v1/sells', auth, services.createSell)
app.post('/v1/detail', auth, services.createDetail)
app.put('/v1/users/:id', auth, services.updateUser)
app.put('/v1/ticket/:id', auth, services.updateTicket)
app.put('/v1/stadium/:id', auth, services.updateStadum)
app.delete('/v1/ret/:id', services.returnSell)
app.delete('/v1/users/:id', services.deleteUser)
app.delete('/v1/ticket/:id', auth, services.deleteTicket)
app.delete('/v1/stadium/:id', auth, services.deleteStadium)
app.delete('/v1/sells/:id', auth, services.deleteSell)
app.post('/v1/login', services.login)
app.get('/v1//home', auth, services.home)
app.post('/v1/welcome', auth, services.welcome)

app.listen(PORT, () => {
  console.log(`Server on port`, PORT)
})