import supertest from "supertest"
import mongoose from "mongoose"
import { app, server } from "../server"

const api = supertest(app)

test("the user can't login if he enters wrong credentials", async() => {
	const fakeCredentials = {
		email: "fakeuser@mail.com",
		password: "password1" 
	}
	await api
		.post("/api/login")
		.send(fakeCredentials)
		.expect(400)
})


afterAll(() => {
	mongoose.connection.close()
	server.close()
})