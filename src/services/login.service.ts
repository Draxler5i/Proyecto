import Login from "../models/Login"

const loginUser = async (user: {email:string, password:string}) => {
    const { email, password } = user
    try {
        const newLogin = new Login({email, password})
        return await newLogin.save() 
    } catch (error) {
        throw error
    }
}

export = {
    loginUser
}