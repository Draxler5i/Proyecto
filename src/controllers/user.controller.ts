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
    const { name, email, cellphone, state } = req.body
    if(!name || !email || !cellphone || !state){
        res.status(400).send({
            status: "FAILED",
            data:{
                error: "Some atributes are missing or are empty"
            }
        })
    }
    try {
        const data = await userService.postUsers(req.body)
        res.status(201).send({status: "OK", message:`User created`})
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

const updateUser = async (req:any, res:any) => {
    let user = req.body.products[0];
    try {
        const data = await userService.updateUsers(user, req.body)
        res.status(200).send({status:"OK", data, message:`User updated`})
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}

const deleteUser = async (req:any, res:any) => {
    const id = parseInt(req.params.id)
    try {
        const data = await userService.deleteUsers(id)
        //res.status(200).send({status:"OK", data:data.command, message:`User deleted with ID:${id}`})
    } catch (error) {
        res.send({ status:"FAILED", data: { error }})
    }
}
const findUser = async (req:any, res:any) => {
    // const id = parseInt(req.params.id)
    // try {
    //     const data = await userService.deleteUsers(id)
    //     //res.status(200).send({status:"OK", data:data.command, message:`User deleted with ID:${id}`})
    // } catch (error) {
    //     res.send({ status:"FAILED", data: { error }})
    // }
}



export = {
    getAllUsers,
    postNewUser, 
    updateUser,
    deleteUser,
    findUser
}