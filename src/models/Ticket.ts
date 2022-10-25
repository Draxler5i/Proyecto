import { Schema, model } from 'mongoose'

const TicketSchema = new Schema({
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    match_date: {
        type: Date,
        required: true
    },
    stadio: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {
    timestamps:true
})

export = model('Ticket', TicketSchema)