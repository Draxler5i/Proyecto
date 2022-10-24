const userService = require('../services/user.service')

const getAllUsers = async (req:any, res:any) => {
    try {
      const data = await userService.getUsers()
      res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error)
    }
}

const postNewUser = async (req:any, res:any) => {
    const { name, age } = req.body
    if(!name){
        res.status(400).send({
            status: "FAILED",
            data:{
                error: "The name is missing or is empty"
            }
        })
    }
    try {
        const data = await userService.postUsers(req.body)
        res.status(201).send({status: "OK", data:data.command, message:`User created`})
    } catch (error) {
        res.send({status:"FAILED", data:error})
    }
}

const updateUser = async (req:any, res:any) => {
    const id = parseInt(req.params.id)
    console.log(id)
    const { name, age } = req.body
    try {
        const data = await userService.updateUsers({id, name, age})
        res.status(200).send({status:"OK", data:data.command, message:`User updated with ID:${id}`})
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async (req:any, res:any) => {
    const id = parseInt(req.params.id)
    try {
        const data = await userService.deleteUsers(id)
        res.status(200).send({status:"OK", data:data.command, message:`User deleted with ID:${id}`})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllUsers,
    postNewUser, 
    updateUser,
    deleteUser
}