import bcrypt from 'bcrypt'

const encrypt = async (password:string) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

const compare = async (passwordLogin:string, passwordStored:string) => {
    return await bcrypt.compare(passwordLogin, passwordStored)
}

export = { 
    encrypt, 
    compare
}