import { Schema, model } from 'mongoose'

const LoginSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps:true
})

export = model('Login', LoginSchema)