import Express from "express"
import bcrypt from "bcrypt"
import User from "../models/User"

const getAllUsers = async (req:Express.Request, res:Express.Response) => {
	try {
		const allUsers = await User.find().populate("ticket_id", {user_id:0, __v:0})
		if (allUsers.length){
			return res.status(200).send({ status: "OK", allUsers })
		} 
		return res.status(204).send({message: "NO CONTENT"})
	} 
	catch (error) {
		res.send({ status:"FAILED", data: { error }})
	}
}

const postNewUser = async (req:Express.Request, res:Express.Response) => {
	const {name, last_name, email, password, birthday, creditCardNumber, creditCardOwner, expirationDate, cvv, balance} = req.body
	const minimumLengthPassword = 6
	if(!name || !last_name || !email || !password || !creditCardNumber || !expirationDate || !cvv || !balance){
		return res.status(400).send({
			status: "FAILED",
			data:{
				error: "Some atributes are missing or are empty"
			}
		})
	}
	if(password.length < minimumLengthPassword){
		return res.status(400).send({
			status: "FAILED",
			data:{
				error: "You have an insecure password, it should have at least 6 characters"
			}
		})
	}
	const existingUser = await User.findOne({ email: email })
	if(existingUser){
		return res.status(400).send({
			status: "FAILED",
			data:{
				error: "The email address is already in use"
			}
		})
	}
	try {
		const saltRound = 10
		const passwordHash = bcrypt.hashSync(password, saltRound)
		const newUser = new User({ name, last_name, email, password: passwordHash, birthday, creditCardNumber, creditCardOwner, expirationDate, cvv, balance })
		await newUser.save()
		return res.status(201).send({status: "OK", message:"User created"})
	} 
	catch (error) {
		res.send({ status:"FAILED", data: { error }})
	}
}

const updateUser = async (req:Express.Request, res:Express.Response) => {
	const { id } = req.params
	if(!id){
		return res.status(400).send({
			status: "FAILED",
			data:{
				error: "ID is missing or is empty"
			}
		})
	}
	try {
		const newData = await User.updateOne({ _id:id }, { $set: req.body})
		return res.status(200).send({status:"OK", newData, message:`User updated with ID:${id}`})
	} 
	catch (error) {
		res.send({ status:"FAILED", data: { error }})
	}
}

const deleteUser = async (req:Express.Request, res:Express.Response) => {
	const { id } = req.params
	if(!id){
		return res.status(400).send({
			status: "FAILED",
			data:{
				error: "ID is missing or is empty"
			}
		})
	}
	const user:any = await User.findById(id)
	if(user.ticket_id.length > 0){
		return res.status(400).send({
			status: "FAILED",
			data:{
				error: "Please delete all tickets before deleting this user"
			}
		})
	}
	try {
		const removedData = await User.deleteOne({_id: id})
		return res.status(200).send({status:"OK", removedData, message:`User deleted with ID:${id}`})
	} 
	catch (error) {
		res.send({ status:"FAILED", data: { error }})
	}
}

export = {
	getAllUsers,
	postNewUser, 
	updateUser,
	deleteUser
}