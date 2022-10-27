import dotenv from 'dotenv'
import express from 'express'
import userRouter from './routes/user.routes'
import ticketRouter from './routes/ticket.routes'

dotenv.config()
const app = express();
const PORT = process.env.PORT_DEV;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/users', userRouter)
app.use('/api/tickets', ticketRouter)

app.listen(PORT, () => {
    console.log(`Server on port`, PORT);
});

