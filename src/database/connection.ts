import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const {MONGODB_URI_TEST} = process.env

mongoose.connect(`${MONGODB_URI_TEST}`)

const database = mongoose.connection

database.on("error", (error) =>{
	console.log(error)
})

database.once("connected", () => {
	console.log("Database Connected")
})


