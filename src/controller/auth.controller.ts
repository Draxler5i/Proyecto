import userService from '../services/user.service'
import encryptor from '../security/encryp'
import validateUser from '../validations/user.validation'
import jwt from 'jsonwebtoken'

const register = async (req: any, res: any) => {
    const { name, lastname, email, password, birthday } = req.body
    if(!name || !lastname || !email || !password){
        res.status(400).send({
            status: "FAILED",
            data:{
                error: "Some attributes are missing or are empty"
            }
        })
    }
    if(!validateUser(req.body)){
        res.status(400).send({
            status: "FAILED",
            data:{
                error: "Some attributes aren't valids"
            }
        })   
    }
    const passwordEncrypted = await encryptor.encrypt(password)
    req.body.password = passwordEncrypted
    req.body.created = new Date(Date.now())
    req.body.birthday = new Date(birthday)
    try {
        const data = await userService.postUsers(req.body)
        res.status(201).send({status: "OK", data:data.command, message:`User created`})
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

const login = async (req:any, res:any) => {
    try {
        const { email, password} = req.body
        if(!email || !password){
            res.status(400).send({
                status: "FAILED",
                data:{
                    error: "The email or password are missing or are empty"
                }
            })
        }
        if(!validateUser(req.body)){
            res.status(400).send({
                status: "FAILED",
                data:{
                    error: "Some attributes aren't valids"
                }
            })   
        }
        const user = await userService.existUser(email)
        if(!user){
            res.status(400).send({
                status: "FAILED",
                data:{
                    error: "The user doesn't exist"
                }
            })
        }
        const validpwd = await encryptor.compare(req.body.password, user[0].password)
        if(!validpwd){
            res.status(400).send({
                status: "FAILED",
                data:{
                    error: "The password is incorrect"
                }
            })
        }
        const token = jwt.sign({
            id: user[0].id_user, 
            email: user[0].email
        }, process.env.TOKEN_SECRET as string)
        console.log(token)
        res.json({
            error: null,
            data: 'Welcome'
        })
    } catch (error) {
        throw error   
    }
}

export = {
    login,
    register
}