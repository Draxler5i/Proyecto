import bcrypt from 'bcrypt'

const encrypt = async (password:string) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

const compare = async (password1:string, password2:string) => {
    return await bcrypt.compare(password1, password2)
}

export = { 
    encrypt, 
    compare
}