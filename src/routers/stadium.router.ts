import { Router } from "express"
import stadiumController from "../controllers/stadium.controller"
const router = Router()

router
	.get("/", stadiumController.getAllStadiums)
	.post("/", stadiumController.postNewStadium)
	.put("/:id", stadiumController.updateStadium)

export = router