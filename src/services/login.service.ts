import jwt from 'jsonwebtoken'
import userServices from "./user.services"

require("dotenv").config();

const login = async (req: any, res: any) => {
    try {
        // return res.send(`Testing`)
        const { name, password } = req.body
        if (!name || !password) {
            return res.status(400).send(`one field is missing name or password`)
        }
        const existUser = await userServices.existentUserByName(name)
        if (existUser === 1) {
            const token = jwt.sign({
                userName: name,
            }, process.env.TOKEN_SECRET as string)
            res.json({
                data: token
            })

        }
    } catch (error) {
        return res.send(`Error ${error}`)
    }
}

export = {
    login,
}

