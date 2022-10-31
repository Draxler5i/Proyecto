import userService from '../services/user.service'
import encryptor from '../security/encryp'
import validateUser from '../validations/user.validation'
import validateCard from '../validations/creditCard.calidation'
import jwt from 'jsonwebtoken'

const register = async (req: any, res: any) => {
    const { name, lastname, email, password, birthday } = req.body.user
    const { nameCard, cvv, expiration, balance } = req.body.card
    if(!name || !lastname || !email || !password || !nameCard || !cvv || !expiration || !balance){
        res.status(400).send({
            status: "FAILED",
            data:{
                error: "Some attributes are missing or are empty"
            }
        })
    }
    req.body.user.birthday = new Date(birthday)
    req.body.card.expiration = new Date(expiration)
    const passwordEncrypted = await encryptor.encrypt(password)
    req.body.user.created = new Date(Date.now())
    req.body.card.created = new Date(Date.now())
    try {
        await validateUser.validate(req.body.user)
        await validateCard.validate(req.body.card)
        req.body.user.password = passwordEncrypted
        const data = await userService.postUsers(req.body.user, req.body.card)
        res.status(201).send({status: "OK", data:data.command, message:`User created`})
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

const login = async (req:any, res:any) => {
    try {
        const { email, password } = req.body
        if(!email || !password){
            res.status(400).send({
                status: "FAILED",
                data:{
                    error: "The email or password are missing or are empty"
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
        res.json({
            error: null,
            data: 'Welcome',
            token: token
        })
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

export = {
    login,
    register
}