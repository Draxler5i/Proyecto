import supertest from "supertest"
import mongoose from "mongoose"
import { app, server } from "../server"

const api = supertest(app)

test("a new stadium can be created", async() => {
	const newStadium = {
		name: "Al Thumama",
		capacity: 40000,
		ticketsAvailable: 3
	}
	await api
		.post("/api/stadiums")
		.send(newStadium)
		.expect(201)
})

afterAll(() => {
	mongoose.connection.close()
	server.close()
})