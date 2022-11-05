const jwtt = require('jsonwebtoken')
const { QueryResult } = require('pg')
const client = require('../postgres/connection')
const encrypt = require('../security/encryption')
client.connect()

const login = async (req: Express.Request, res: Express.Response) => {
    const { email, password } = req.body
    if (email && password) {
        await client.query('SELECT * FROM public.user WHERE email = $1', [email], (error: Error, results: typeof QueryResult) => {
            if (error) return res.send(error)
            if (results.rows.length === 0) return res.send('Incorrect email')
            if (!encrypt.validatePassword(password, results.rows[0].password)) return res.send('Incorrect Password!')
            const token = jwtt.sign(
                { email },
                process.env.TOKEN,
                {
                    expiresIn: '1h',
                }
            )
            res.send(token)
        })
    } else {
        res.send('Please enter email and Password!')
    }
}
const home = (req: Express.Request, res: Express.Response) => {
    if (req.session.loggedin) {
        res.send('Welcome back, ' + req.session.email + '!')
    } else {
        res.send('Please login to view this page!')
    }
}
const welcome = (req: Express.Request, res: Express.Response) => {
    res.status(200).send('Welcome 🙌 ')
}

export = {
    login, home, welcome
}