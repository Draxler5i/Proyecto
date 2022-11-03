import Express from 'express'
import Stadium from '../models/Stadium'

const getAllStadiums = async (req:Express.Request, res:Express.Response) => {
    try {
      const allStadiums = await Stadium.find()//no mostrar todos los campos
      if (allStadiums.length){
        return res.status(200).send({ status: "OK", allStadiums })
      } 
      return res.status(204).send({message: 'NO CONTENT'})
    } 
    catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

const postNewStadium = async (req:Express.Request, res:Express.Response) => {
    const {name, capacity, ticketsAvailable} = req.body
    try{
        const newStadium = new Stadium({ name, capacity, ticketsAvailable })
        await newStadium.save()
        return res.status(201).send({status: "OK", message:`Stadium created`})
    }
    catch (error){
        res.send({ status:"FAILED", data: { error }})
    }
}
    

export = {
    getAllStadiums,
    postNewStadium
}