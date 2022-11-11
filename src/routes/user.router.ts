import { Router } from "express";
import userController from "../controller/user.controller";

const router = Router()

router
    .get('/users', userController.getUsersController)
    .post('/users', userController.postUser)
    .put('/users/:id', userController.updateUser)
    .delete('/users/:id', userController.deleteUserController)
export = router