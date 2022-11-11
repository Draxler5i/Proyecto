import userServices from "../services/user.services"


const getUsersController = async (req: any, res: any) => {
    try {
        const user = await userServices.getUsers()
        res.send({ status: 'OK', data: user })
    } catch (error) {
        console.log(`Something go wron get all users Controller':${error}`);
        res.send({ status: 'FAILED', data: { error } })
    }
}

const postUser = async (req: any, res: any) => {
    try {
        const postUser = await userServices.postUser(req.body)
        res.status(201).send({
            status: `SUCCESS`,
            data: postUser,
        })
    } catch (error) {
        console.log(`Something go wrong with postUser Controller `);
        res.status(400).send({ data: error })
    }
}

const updateUser = async (req: any, res: any) => {
    const id = parseInt(req.params.id)
    if (!id) {
        res.status(400).send(`ID is missing or empty`) // constante 
    }
    try {
        const putUser = await userServices.putUser(req.body, id)
        res.status(200).send({
            status: `SUCCESS`,
            data: putUser,
        })
    } catch (error) {
        console.log(`Someting go wrong updateUser Controller ${error}`);
        res.status(400).send({ data: error })
    }
}

const deleteUserController = async (req: any, res: any) => {
    const id = parseInt(req.params.id)
    if (!id) {
        res.status(400).send(`ID is missing or empty`)
    }
    try {
        const deleteUser = await userServices.deleteUser(id)
        res.status(200).send({
            status: `SUCCES`,
            data: deleteUser,
        })
    } catch (error) {
        console.log(`Someting go wrong delete controller ${error} `);
        res.status(400).send({ data: error })
    }
}

export = {
    getUsersController,
    updateUser,
    postUser,
    deleteUserController
}