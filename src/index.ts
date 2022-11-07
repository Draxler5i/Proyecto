import dotenv from 'dotenv'
import express from 'express'
import userRouter from './routes/user.routes'
import ticketRouter from './routes/ticket.routes'
import verifyToken from './middlewares/verifyToken'
import authRouter from './routes/auth.router'
import saleRouter from './routes/sale.router'

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/auth', authRouter)
app.use('/api/users', verifyToken, userRouter)
app.use('/api/tickets', verifyToken, ticketRouter)
app.use('/api/sales', verifyToken, saleRouter)

app.listen(PORT, () => {
	console.log('Server on port', PORT)
})

export = app
