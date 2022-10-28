import { Router } from "express";

const loginServices = require('./services/loginServices')

const route = Router()
route
    .post(' /login', loginServices.login)
export = route