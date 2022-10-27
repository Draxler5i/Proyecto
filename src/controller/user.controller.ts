import userService from '../services/user.service'

const getAllUsers = async (req:any, res:any) => {
    try {
      const data = await userService.getUsers()
      res.send({ status: "OK", data })
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

const getUser = async (req:any, res:any) => {
    const id = parseInt(req.params.id)
    if(!id){
        res.status(400).send({
            status: "FAILED",
            data:{
                error: "The ID is missing or is empty"
            }
        })
    }
    try {
      const data = await userService.getOneUser(id)
      res.send({ status: "OK", data });
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

const postNewUser = async (req:any, res:any) => {
    const { name, lastname, email, password } = req.body
    if(!name || !lastname || !email || !password){
        res.status(400).send({
            status: "FAILED",
            data:{
                error: "Some attributes are missing or are empty"
            }
        })
    }
    try {
        const data = await userService.postUsers(req.body)
        res.status(201).send({status: "OK", data:data.command, message:`User created`})
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

const updateUser = async (req:any, res:any) => {
    const id = parseInt(req.params.id)
    if(!id){
        res.status(400).send({
            status: "FAILED",
            data:{
                error: "The ID is missing or is empty"
            }
        })
    }
    req.body.id = id
    try {
        const data = await userService.updateUsers(req.body)
        res.status(200).send({status:"OK", data:data.command, message:`User updated with ID:${id}`})
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

const deleteUser = async (req:any, res:any) => {
    const id = parseInt(req.params.id)
    if(!id){
        res.status(400).send({
            status: "FAILED",
            data:{
                error: "The ID is missing or is empty"
            }
        })
    }
    try {
        const data = await userService.deleteUsers(id)
        res.status(200).send({status:"OK", data:data.command, message:`User deleted with ID:${id}`})
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

export = {
    getAllUsers,
    getUser,
    postNewUser, 
    updateUser,
    deleteUser
}