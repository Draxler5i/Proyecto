import { Schema, model } from "mongoose"

const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	birthday: {
		type: Date,
		required: false
	},
	ticket_id: {
		type: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
		required: true
	},
	creditCardNumber:{
		type: String,
		required: true
	},
	creditCardOwner:{
		type: String,
		required: true
	},
	expirationDate:{
		type: Date,
		required: true
	},
	cvv:{
		type: String,
		required: true
	},
	balance:{
		type: Number,
		required: true
	}
}, {
	timestamps:true
})

export = model("User", UserSchema)