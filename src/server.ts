import dotenv from 'dotenv'
import './database/conection'
import express from 'express'
import userRouter from './routers/user.router'
import ticketRouter from './routers/ticket.router'

const app = express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
const { PORT_DEV } = process.env

app.use('/api/users', userRouter)
app.use('/api/tickets', ticketRouter)

app.listen(PORT_DEV, ()=> {
  console.log(`Server on port ${PORT_DEV}`)
})
