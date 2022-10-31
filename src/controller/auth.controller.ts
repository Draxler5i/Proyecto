import userService from '../services/user.service'
import encryptor from '../security/encryp'
import validateUser from '../validations/user.validation'
import validateCard from '../validations/creditCard.calidation'
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
    req.body.birthday = new Date(birthday)
    const passwordEncrypted = await encryptor.encrypt(password)
    req.body.password = passwordEncrypted
    req.body.created = new Date(Date.now())
    try {
        await validateUser.validate(req.body)
        await validateCard.validate(req.body)
        const data = await userService.postUsers(req.body.user, req.body.card)
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
        await validateUser.validate(req.body)
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
        res.json({
            error: null,
            data: 'Welcome',
            token: token
        })
    } catch (error) {
        throw error   
    }
}

export = {
    login,
    register
}