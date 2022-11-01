import dotenv from 'dotenv'
const jwt = require('jsonwebtoken')
import User from '../models/User';

dotenv.config()

const {JWT_KEY} = process.env

const checkPayload = async(req:any, res:any)=>{
    const entryEmail: String  = req.body.email
    const entryPassword: String = req.body.password
    const user:any = await User.findOne({ email: entryEmail })
    if(entryEmail == user.email && entryPassword == user.password){
        const payload = {
            check: true
        }
        const token = jwt.sign(payload, JWT_KEY,{
            expiresIn: '7d'
        })
        res.status(200).json({
            message: 'SUCCESFUL AUTHENTICATION',
            token: token
        })
    }else{
        res.status(400).json({
            message: 'INCORRECT USER OR PASSWORD, PLEASE TRY AGAIN'
        })
    }
}

export = {
    checkPayload
}