import express from 'express'
import './database/connection'
import dotenv from 'dotenv'
import userRouter from './routers/user.router'
import ticketRouter from './routers/ticket.router'
import stadiumRouter from './routers/stadium.router'
import loginRouter from './routers/login.router'

const app = express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
const { PORT } = process.env

app.use('/api/users', userRouter)
app.use('/api/tickets', ticketRouter)
app.use('/api/stadiums', stadiumRouter)
app.use('/api/login', loginRouter)

app.listen(PORT, ()=> {
  console.log(`Server on port ${PORT}`)
})