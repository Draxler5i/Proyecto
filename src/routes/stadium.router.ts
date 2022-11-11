import { Router } from "express";
import stadiumController from "../controller/stadium.controller";

const router = Router()

router
    .get('/stadium', stadiumController.getStadiums)
    .post('/stadium', stadiumController.postStadium)
    .put('/stadium/:id', stadiumController.updateStadium)
    .delete('/stadium/:id', stadiumController.deleteStadium)
    .get('/stadium/:id', stadiumController.getStadiumById)
export = router