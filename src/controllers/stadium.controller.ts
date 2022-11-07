import Express from "express"
import Stadium from "../models/Stadium"

const getAllStadiums = async (req:Express.Request, res:Express.Response) => {
	try {
		const allStadiums = await Stadium.find()
		if (allStadiums.length){
			return res.status(200).send({ status: "OK", allStadiums })
		} 
		return res.status(204).send({message: "NO CONTENT"})
	} 
	catch (error) {
		res.send({ status:"FAILED", data: { error }})
	}
}

const postNewStadium = async (req:Express.Request, res:Express.Response) => {
	const {name, capacity, ticketsAvailable} = req.body
	if(!name || !capacity || !ticketsAvailable){
		return res.status(400).send({
			status: "FAILED",
			data:{
				error: "Some atributes are missing or are empty"
			}
		})
	}
	try{
		const newStadium = new Stadium({ name, capacity, ticketsAvailable })
		await newStadium.save()
		return res.status(201).send({status: "OK", message:"Stadium created"})
	}
	catch (error){
		res.send({ status:"FAILED", data: { error }})
	}
}

const updateStadium = async (req:Express.Request, res:Express.Response) => {
	const { id } = req.params
	const {ticketsAvailable} = req.body
	if(!id){
		return res.status(400).send({
			status: "FAILED",
			data:{
				error: "ID is missing or is empty"
			}
		})
	}
	try {
		const newData = await Stadium.updateOne({ _id:id }, { $set: {ticketsAvailable: ticketsAvailable}})
		return res.status(200).send({status:"OK", newData, message:`Stadium updated with ID:${id}`})
	} 
	catch (error) {
		res.send({ status:"FAILED", data: { error }})
	}
}  

export = {
	getAllStadiums,
	postNewStadium,
	updateStadium
}