import { Request, Response } from 'express'
import userService from '../services/user.service'

const message = {
    status: "FAILED", data:{ error: "The ID is missing or is empty" }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const data = await userService.getUsers()
        res.send({ status: "OK", data })
    } catch (error) {
        console.error(`Some wrong in getAllUsers controller: ${error}`)
        res.send({ status:"FAILED", data: { error }})
    }
}

const getUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if(!id) res.status(400).send(message)
    try {
        const data = await userService.getOneUser(id)
        res.send({ status: "OK", data })
    } catch (error) {
        console.error(`Some wrong in getUser controller: ${error}`)
        res.send({ status:"FAILED", data: { error }})
    }
}

const updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if(!id) res.status(400).send(message)
    req.body.id = id
    try {
        const data = await userService.updateUsers(req.body)
        res.status(200).send({status:"OK", data, message:`User updated with ID:${id}`})
    } catch (error) {
        console.error(`Some wrong in updateUser controller: ${error}`)
        res.send({ status:"FAILED", data: { error }})
    }
}

const deleteUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if(!id) res.status(400).send(message)
    try {
        const data = await userService.deleteUsers(id)
        res.status(200).send({status:"OK", data, message:`User deleted with ID:${id}`})
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