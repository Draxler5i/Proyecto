import jwt from 'jsonwebtoken'
import userServices from "./user.services"
require("dotenv").config();

const login = async (req: any, res: any) => {
    try {
        const { name, password } = req.body
        if (!name || !password) {
            throw res.status(400).send(`one field is missing name or password`)
        }
        const existUser = await userServices.existUser(name)
        if (existUser === 1) {

            const token = jwt.sign({
                userName: name,
            }, process.env.TOKEN_SECRET as string)
            res.json({
                data: token
            })

        }
    } catch (error) {
        throw (error)
    }
}

export = {
    login,
}

