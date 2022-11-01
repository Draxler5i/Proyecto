import User from '../models/User'

const getUsers = async () => {
    try {
       return await User.find().populate('ticket_id')
    } catch (error) {
        throw error
    }
}

const postUsers = async (user: {name:string, last_name:string, email:string, password:string, birthday:string, ticket_id:string, creditCardNumber:string, creditCardOwner:string, expirationDate:string, cvv: string, balance: number}) => {
    const { name, last_name, email, password, birthday, ticket_id, creditCardNumber, creditCardOwner, expirationDate, cvv, balance } = user
    try {
        const newUser = new User({name, last_name, email, password, birthday, ticket_id, creditCardNumber, creditCardOwner, expirationDate, cvv, balance})
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