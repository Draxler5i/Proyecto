import 'dotenv/config'
import express from 'express'
import userRouter from './routes/user.router'
import ticketRouter from './routes/ticket.router'
import loginRouter from './routes/login.router'


const app = express()
const port = process.env.PORT || 4005

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/api/users', userRouter)
app.use('/api/tickets', ticketRouter)
app.use('/api/login', loginRouter)



app.listen(port, () => {
    console.log(`Server on port`, port)
})