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
	if(!name || !ticketsAvailable){
		return res.status(400).send({
			status: "FAILED",
			data:{
				error: "Some atributes are missing or are empty"
			}
		})
	}
	const existingStadium = await Stadium.findOne({ name: name })
	if(existingStadium){
		return res.status(400).send({
			status: "FAILED",
			data:{
				error: "The stadium you want to create, already exists"
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
	const {name, capacity, ticketsAvailable} = req.body
	const existingStadium = await Stadium.findById(id)
	if(!existingStadium){
		return res.status(400).send({
			status: "FAILED",
			data:{
				error: "The stadium you are looking for doesn't exist. Please check the id"
			}
		})
	}
	if(name || capacity){
		return res.status(400).send({
			status: "FAILED",
			data:{
				error: "You can only modify the number of tickets for this stadium"
			}
		})
	}
	try {
		const updatedData = await Stadium.findByIdAndUpdate(id, {ticketsAvailable: ticketsAvailable}, {new: true})
		return res.status(200).send({
			status:"OK",
			updatedData: updatedData,
			message:`Stadium updated with ID:${id}`
		})
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