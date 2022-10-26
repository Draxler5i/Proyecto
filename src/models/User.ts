import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cellphone: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    state: {
        type: Boolean,
        required: true
    },
}, {
    timestamps:true
})

export = model('User', UserSchema)