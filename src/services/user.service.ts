import User from '../models/User'

const getUsers = async () => {
    try {
       return await User.find()
    } catch (error) {
        throw error
    }
}

const postUsers = async (user: {name:string, age:number, email:string, cellphone:number, address:string, country:string, state:boolean}) => {
    const { name, age, email, cellphone, address, country, state } = user
    try {
        const newUser = new User({name, age, email, cellphone, address, country, state})
        return await newUser.save() 
    } catch (error) {
        throw error
    }
}

const updateUsers = async (id:string, user:any) => {
    try {
        return await User.updateOne({ _id:id }, { $set: user})
    } catch (error) {
        throw error
    }
}

const deleteUsers = async (id:string) => {
    try {
        return await User.remove({_id: id})
    } catch (error) {
        throw error
    }
}

export = {
    getUsers, 
    postUsers, 
    updateUsers, 
    deleteUsers
}