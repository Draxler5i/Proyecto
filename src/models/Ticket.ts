import { Schema, model } from "mongoose"

const TicketSchema = new Schema({
	price: {
		type: Number,
		required: true
	},
	currency: {
		type: String,
		required: true
	},
	match_day: {
		type: Date,
		required: true
	},
	stadium_id: {
		type: String,
		required: true
	},
	stadium_name: {
		type: String,
		required: true
	},
	seat: {
		type: String,
		required: true
	},
	user_id: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	}
}, {
	timestamps:true
})

export = model("Ticket", TicketSchema)