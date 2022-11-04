import Express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User'

const getAllUsers = async (req:Express.Request, res:Express.Response) => {
    try {
      const allUsers = await User.find().populate('ticket_id', {user_id:0, __v:0})//no mostrar todos los campos
      if (allUsers.length){
        return res.status(200).send({ status: "OK", allUsers })
      } 
      return res.status(204).send({message: 'NO CONTENT'})
    } 
    catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

const postNewUser = async (req:Express.Request, res:Express.Response) => {
    const {name, last_name, email, password, birthday, creditCardNumber, creditCardOwner, expirationDate, cvv, balance} = req.body
    if(!name || !last_name || !email || !password){
        return res.status(400).send({
            status: "FAILED",
            data:{
                error: "Some atributes are missing or are empty"
            }
        })
    }
    if(password.length < 6){
        return res.status(400).send({
            status: "FAILED",
            data:{
                error: "You have an insecure password, it should have at least 6 characters"
            }
        })
    }
    try {
        const saltRound = 10
        const passwordHash:any = bcrypt.hashSync(password, saltRound)
        console.log(passwordHash)
        const newUser = new User({ name, last_name, email, password: passwordHash, birthday, creditCardNumber, creditCardOwner, expirationDate, cvv, balance })
        await newUser.save()
        return res.status(201).send({status: "OK", message:`User created`})
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