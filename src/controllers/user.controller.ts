import userService from '../services/user.service'

const getAllUsers = async (req:any, res:any) => {
    try {
      const data = await userService.getUsers()
      if (data.length) return res.status(200).send({ status: "OK", data });
      return res.status(204).send({message: 'NO CONTENT'})
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

const postNewUser = async (req:any, res:any) => {
    const { name, last_name, email, password } = req.body
    if(!name || !last_name || !email || !password){
        res.status(400).send({
            status: "FAILED",
            data:{
                error: "Some atributes are missing or are empty"
            }
        })
    }else if(password.length < 6){
        res.status(400).send({
            status: "FAILED",
            data:{
                error: "You have an insecure password, it should have at least 6 characters"
            }
        })
    }
    try {
        await userService.postUsers(req.body)
        res.status(201).send({status: "OK", message:`User created`})
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

const updateUser = async (req:any, res:any) => {
    const { id } = req.params
    if(!id){
        res.status(400).send({
            status: "FAILED",
            data:{
                error: "ID is missing or is empty"
            }
        })
    }
    try {
        const data = await userService.updateUsers(id, req.body)
        res.status(200).send({status:"OK", data, message:`User updated with ID:${id}`})
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

const deleteUser = async (req:any, res:any) => {
    const { id } = req.params
    if(!id){
        res.status(400).send({
            status: "FAILED",
            data:{
                error: "ID is missing or is empty"
            }
        })
    }
    try {
        const data = await userService.deleteUsers(id)
        res.status(200).send({status:"OK", data, message:`User deleted with ID:${id}`})
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

export = {
    getAllUsers,
    postNewUser, 
    updateUser,
    deleteUser
}