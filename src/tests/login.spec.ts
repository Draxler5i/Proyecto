import mongoose from "mongoose"
import { server } from "../server"
import { api, STATUS_OK, STATUS_BAD_REQUEST } from "./general.helper"
import { createOneUser } from "./user.helper"

createOneUser
test.skip("the user can't login if the email he enters doesn't exist", async() => {
	const fakeEmail = {
		email: "fakeuser@mail.com",
		password: "password1" 
	}
	await api
		.post("/api/login")
		.send(fakeEmail)
		.expect(STATUS_BAD_REQUEST)
})

test("the user can't login if the password he enters is incorrect", async() => {
	const fakePassword = {
		email: "adamsmith@mail.com",
		password: "fakePassword" 
	}
	await api
		.post("/api/login")
		.send(fakePassword)
		.expect(STATUS_BAD_REQUEST)
})

test.skip("the authentication is successful after we send the correct parameters to the login", async () => {
	const validCredentials = {
		email: "adamsmith@mail.com",
		password: "password1" 
	}
	await api
		.post("/api/login")
		.send(validCredentials)
		.expect(STATUS_OK)
})

afterAll(() => {
	mongoose.connection.close()
	server.close()
})