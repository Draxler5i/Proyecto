import supertest from "supertest"
import { app } from "../server"

const api = supertest(app)

const createOneTicket = beforeAll(async () => {
	const getUser = await api.get("/api/users")
	const userId = getUser.body.allUsers[0]._id
	const getStadiums = await api.get("/api/stadiums")
	const stadiumId = getStadiums.body.allStadiums[0]._id
	const newTicket = {
		price: 100,
		currency: "$",
		match_day: "2022-11-05",
		stadium_id: stadiumId,
		stadium_name: "Al Ahmad",
		seat: "1 A-1",
		user_id: userId
	}
	let jwtToken = ""
	const validCredentials = {
		email: "adamsmith@mail.com",
		password: "password1" 
	}
	const response = await api.post("/api/login").send(validCredentials)
	jwtToken = response.body.token
	await api.post("/api/tickets").set("Authorization", `Bearer ${jwtToken}`).send(newTicket)
})

export {
	createOneTicket
}
 

		