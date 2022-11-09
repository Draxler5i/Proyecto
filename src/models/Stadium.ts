import { Schema, model } from "mongoose"

const StadiumSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	capacity: {
		type: Number,
		required: false
	},
	ticketsAvailable:{
		type: Number,
		required: true
	}
})

export = model("Stadium", StadiumSchema)