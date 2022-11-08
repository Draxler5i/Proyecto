require(`dotenv`).config()
const express = require(`express`)
const log = require(`./routes/login.route`)
const ticket = require(`./routes/ticket.route`)
const users = require(`./routes/user.route`)
const sell = require(`./routes/sell.route`)
const stadium = require(`./routes/stadium.route`)
const session = require(`express-session`)
const auth = require(`./jwt/auth`)
const app = express()
const PORT = process.env.SERVER_PORT || 4001

app.use(session({ secret: `secret`, resave: true, saveUninitialized: true }))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(`/v1/login`, log)
app.use(`/v1/stadium`, auth, stadium)
app.use(`/v1/users`, users)
app.use(`/v1/tickets`, auth, ticket)
app.use(`/v1/sells`, auth, sell)
app.listen(PORT, () => { console.log(`Server on port`, PORT) })
export = app