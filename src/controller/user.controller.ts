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
    try {
        const data = await userService.postUser()
        res.send({status: "OK", data:data})
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async (req:any, res:any) => {
    try {
        const data = await userService.updateUser()
        res.send({status:"OK", data:data})
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async (req:any, res:any) => {
    try {
        const data = await userService.deleteUser()
        res.send({status:"OK", data:data})
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