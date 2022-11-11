import userServices from "../services/user.services"

const ID_MISSING = 'ID is missing '

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
        const postUser = await userServices.postUser(
            {
                "name": "walter",
                "password": "asdas",
                "email": "walter@asds.com",
                "cellphone": 654,
                "age": 45,
                "address": "Monas",
                "country": "string",
                "state": true
            }
        )
        res.status(201).send({
            status: `SUCCESS`,
            data: postUser,
        })
    } catch (error) {
        console.log(`Something go wrong with postUser Controller  ${error}`);
        res.status(400).send({ data: error })
    }
}

const updateUser = async (req: any, res: any) => {
    const id = parseInt(req.params.id)
    if (!id) {
        res.status(400).send(ID_MISSING)
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
        res.status(400).send(ID_MISSING)
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