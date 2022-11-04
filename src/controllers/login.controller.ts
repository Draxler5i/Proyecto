import dotenv from 'dotenv'
import Express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User'
dotenv.config()

const { JWT_KEY }:any = process.env

const loginUser = async(req:Express.Request, res:Express.Response)=>{
    const entryEmail: String  = req.body.email
    const entryPassword: any = req.body.password
    const user:any = await User.findOne({ email: entryEmail })
    if(entryEmail == user.email && bcrypt.compareSync(entryPassword, user.password)){
        const userForToken = {
            id: user._id,
            email: user.email
        }
        const token = jwt.sign(userForToken, JWT_KEY)
        return res.status(200).send({
            message: 'SUCCESFUL AUTHENTICATION',
            email: user.email,
            token: token
        })
    }else{
        res.status(400).send({
            message: 'INCORRECT USER OR PASSWORD, PLEASE TRY AGAIN',
        })
    }
}

export = {
    loginUser
}