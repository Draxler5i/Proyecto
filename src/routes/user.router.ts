import { Router } from "express";

const userServices = require('./services/userServices')
const router = Router()

router
    .get('/users', userServices.getUsers)
    .post('/users', userServices.postUser)
    .put('/users/:id', userServices.putUser)
    .delete('/users/:id', userServices.deleteUser)
export = router