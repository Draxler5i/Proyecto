import { Router } from "express";
import loginService from "../services/login.service";

const route = Router()
route
    .post(' /login', loginService.login)
export = route