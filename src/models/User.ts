import { Schema, model } from 'mongoose'

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
        type: String,
        required: false
    }
}, {
    timestamps:true
})

export = model('User', UserSchema)