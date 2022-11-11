import supertest from "supertest"
import { app } from "../server"
import Stadium from "../models/Stadium"

const api = supertest(app)
const stadiumAhmad = {
	name: "Ahmad Bin Ali",
	capacity: 40000,
	ticketsAvailable: 10
}
const stadiumJanoub = {
	name: "Al Janoub",
	capacity: 40000,
	ticketsAvailable: 10
}

const createOneStadium = beforeAll(async () => {
	await Stadium.deleteMany({})
	await api.post("/api/stadiums").send(stadiumAhmad)
})

export {
	stadiumAhmad,
	stadiumJanoub,
	createOneStadium
}