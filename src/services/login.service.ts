const jwt = require('jsonwebtoken')

const login = async (req: any, res: any) => {
    try {
        const { name, password } = req.body
        if (!name || !password) {
            throw res.status(400)
        }

        const token = jwt.sign({
            userName: req.body.userName,
            password: req.body.password,
        }, process.env.TOKEN_SECRET)
        res.json({
            data: token
        })
    } catch (error) {
        throw (error)
    }
}

module.exports = {
    login,
}

