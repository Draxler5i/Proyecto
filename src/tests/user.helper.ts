import supertest from "supertest"
import { app } from "../server"
import User from "../models/User"

const api = supertest(app)

const userAdam = {
	name: "Adam",
	last_name: "Smith", 
	email: "adamsmith@mail.com",
	password: "password1", 
	birthday: "1992-07-30",
	creditCardNumber: "123456789123",
	creditCardOwner: "Adam Smith",
	expirationDate: "2025-03",
	cvv: 456,
	balance: 1100
}

const userBrian = {
	name: "Brian",
	last_name: "Abbey", 
	email: "brianabbey@mail.com",
	password: "password2", 
	birthday: "1984-05-21",
	creditCardNumber: "123456789123",
	creditCardOwner: "Brian Abbey",
	expirationDate: "2026-04",
	cvv: 456,
	balance: 1100
}

const createOneUser = beforeAll(async () => {
	await User.deleteMany({})
	await api.post("/api/users").send(userAdam)
})

export {
	userAdam,
	userBrian,
	createOneUser,
}