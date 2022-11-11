import dotenv from "dotenv"
import Express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User"
dotenv.config()

const { JWT_KEY }: any = process.env

const loginUser = async(req:Express.Request, res:Express.Response)=>{
	const entryEmail  = req.body.email
	const entryPassword = req.body.password
	try{
		const user = await User.findOne({ email: entryEmail })
		if(!user){
			return res.status(400).send({
				message: "THE USER EMAIL DOESN'T EXIST, PLEASE TRY AGAIN"
			})
		}
		if(bcrypt.compareSync(entryPassword, user.password)){
			const userForToken = {
				id: user._id,
				email: user.email
			}
			const token = jwt.sign(userForToken, JWT_KEY)
			return res.status(200).send({
				message: "SUCCESFUL AUTHENTICATION",
				email: user.email,
				token: token
			})
		}else{
			return res.status(400).send({ message: "INCORRECT PASSWORD, PLEASE TRY AGAIN"})
		}
	}catch (error) {
		res.send({ status:"FAILED", data: { error }})
	}
}

export = {
	loginUser
}