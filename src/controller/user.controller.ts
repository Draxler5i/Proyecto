import userService from '../services/user.service'

const MESSAGE_ERROR = {
    status: "FAILED", data:{ error: "The ID is missing or is empty" }
}

const getAllUsers = async (req: any, res: any) => {
    try {
        const users = await userService.getUsers()
        res.send({ status: "OK", data:users })
    } catch (error) {
        console.error(`Some wrong in getAllUsers controller: ${error}`)
        res.send({ status:"FAILED", data: { error }})
    }
}

const getUser = async (req: any, res: any) => {
    const id = parseInt(req.params.id)
    if(!id) res.status(400).send(MESSAGE_ERROR)
    try {
        const user = await userService.getOneUser(id)
        res.send({ status: "OK", data:user })
    } catch (error) {
        console.error(`Some wrong in getUser controller: ${error}`)
        res.send({ status:"FAILED", data: { error }})
    }
}

const updateUser = async (req: any, res: any) => {
    const id = parseInt(req.params.id)
    if(!id) res.status(400).send(MESSAGE_ERROR)
    req.body.id = id
    try {
        const userUpdated = await userService.updateUser(req.body)
        res.status(200).send({status:"OK", data:userUpdated, message:`User updated with ID:${id}`})
    } catch (error) {
        console.error(`Some wrong in updateUser controller: ${error}`)
        res.send({ status:"FAILED", data: { error }})
    }
}

const deleteUser = async (req: any, res: any) => {
    const id = parseInt(req.params.id)
    if(!id) res.status(400).send(MESSAGE_ERROR)
    try {
        const userDeleted = await userService.deleteUser(id)
        res.status(200).send({status:"OK", data:userDeleted, message:`User deleted with ID:${id}`})
    } catch (error) {
        console.error(`Some wrong in deleteUser controller: ${error}`)
        res.send({ status:"FAILED", data: { error }})
    }
}

export = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}