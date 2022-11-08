import supertest from "supertest"
import mongoose from "mongoose"
import { app, server } from "../server"

const api = supertest(app)

test("we can get all tickets", async () => {
	await api
		.get("/api/tickets")
		.expect(200)
})

test("a user can't buy a new ticket without a JWT", async() => {
	const newTicket = {
		price: 100,
		currency: "$",
		match_day: "2022-11-05",
		stadium_id: "63632eec4c8a6c2f5032ad0b",
		stadium_name: "Al Janoub",
		seat: "6 B-3",
		user_id: "6368ff9bccdfd97734d68ff1"
	}
	await api
		.post("/api/tickets")
		.send(newTicket)
		.expect(401)
})


afterAll(() => {
	mongoose.connection.close()
	server.close()
})