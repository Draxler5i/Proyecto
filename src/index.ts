import dotenv from 'dotenv'
import saleRouter from '../src/routes/sale.router'
import loginRouter from '../src/routes/login.router'
import userRouter from '../src/routes/user.router'
import ticketRouter from '../src/routes/ticket.router'
import stadiumRout from '../src/routes/stadium.router'
import express from "express"

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: false })) 

app.use('/api', userRouter)
app.use('/api', ticketRouter)
app.use('/api', loginRouter)
app.use('/api', stadiumRout)
app.use('/api', saleRouter)

app.listen(PORT, () => {
    console.log(`Server on port`, PORT)
})