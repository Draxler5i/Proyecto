import loginService from '../services/login.service'

const loginUser = async (req:any, res:any) => {
    const { email, password } = req.body
    if(!email || !password){
        res.status(400).send({
            status: "FAILED",
            data:{
                error: "Some atributes are missing or are empty"
            }
        })
    }
    try {
        await loginService.loginUser(req.body)
        res.status(201).send({status: "OK", message:`Login accepted`})
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

export = {
    loginUser
}