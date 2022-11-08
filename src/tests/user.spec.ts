import supertest from "supertest"
import mongoose from "mongoose"
import { app, server } from "../server"

const api = supertest(app)

test("we can't create a new user without a credit card number", async() => {
	const newUser = {
		name: "zzzzz",
		last_name: "zzsda", 
		email: "zzzzzz232323@mail.com",
		password: "password4", 
		birthday: "1980-07-30",
		creditCardOwner: "Brian Mackenzie Brown",
		expirationDate: "2026-04",
		cvv: "456",
		balance: 4000
	}
	await api
		.post("/api/users")
		.send(newUser)
		.expect(400)
})


afterAll(() => {
	mongoose.connection.close()
	server.close()
})