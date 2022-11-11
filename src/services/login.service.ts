const jwtt = require(`jsonwebtoken`)
const client = require(`../postgres/connection`)
const encrypt = require(`../security/encryption`)

const login = async (req: Express.Request, res: Express.Response) => {
    const { email, password } = req.body
    if (email && password) {
        const user_data = await client.query(`SELECT * FROM public.user WHERE email = $1`, [email])
        if (user_data.rows.length === 0) {
            return res.satatus(400).send(`Incorrect email`)
        }
        if (!encrypt.validatePassword(password, user_data.rows[0].password)) {
            return res.status(400).send(`Incorrect Password!`)
        }
        const token = jwtt.sign(
            { email },
            process.env.TOKEN,
            {
                expiresIn: `1h`,
            }
        )
        return res.status(200).send(
            {
                status: 'OK',
                token: token
            })
    } else {
        return res.status(200).send(`Please enter email and Password!`)
    }
}
const home = (req: Express.Request, res: Express.Response) => {
    if (req.session.loggedin) {
        return res.status(200).send(`Welcome back, ` + req.session.email + `!`)
    } else {
        return res.status(403).send(`Please login to view this page!`)
    }
}
const welcome = (req: Express.Request, res: Express.Response) => {
    return res.status(200).send(`Welcome 🙌 `)
}

export = {
    login, home, welcome
}