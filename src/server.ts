import dotenv from 'dotenv'
import './database/connection'
import express from 'express'
import userRouter from './routers/user.router'
import ticketRouter from './routers/ticket.router'
import stadiumRouter from './routers/stadium.router'
import loginRouter from './routers/login.router'
import verificationRouter from './routers/verification.router'

const app = express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
const { PORT_DEV } = process.env

app.use('/api/users', userRouter)
app.use('/api/tickets', ticketRouter)
app.use('/api/stadiums', stadiumRouter)
app.use('/api/login', loginRouter)
app.use('/api/info', verificationRouter)

app.listen(PORT_DEV, ()=> {
  console.log(`Server on port ${PORT_DEV}`)
})