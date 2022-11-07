import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const {MONGODB_URI} = process.env

mongoose.connect(`${MONGODB_URI}`)

const database = mongoose.connection

database.on("error", (error) =>{
	console.log(error)
})

database.once("connected", () => {
	console.log("Database Connected")
})


