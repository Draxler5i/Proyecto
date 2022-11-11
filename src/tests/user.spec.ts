import mongoose from "mongoose"
import { server } from "../server"
import { api, STATUS_OK, STATUS_CREATED, STATUS_NO_CONTENT, STATUS_BAD_REQUEST, cleanDB} from "./general.helper"
import { createOneUser, userAdam, userBrian } from "./user.helper"
import { createOneStadium } from "./stadium.helper"
import User from "../models/User"
import Ticket from "../models/Ticket"

cleanDB

describe.skip("get all users", () => {
	createOneUser
	test("we can see all users", async() => {
		await api
			.get("/api/users")
			.expect(STATUS_OK)
	})
	test("when there are no users we should get a No Content Status", async () => {
		await User.deleteMany({})
		await api
			.get("/api/users")
			.expect(STATUS_NO_CONTENT)
	})
})

describe.skip("we can't create a new user", () => {
	beforeAll(async () => {
		await User.deleteMany({})
	})
	test("we can't create a new user without a name", async() => {
		const noNameUser = {
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
		await api
			.post("/api/users")
			.send(noNameUser)
			.expect(STATUS_BAD_REQUEST)
	})
	test("we can't create a new user without a last name", async() => {
		const noLastNameUser = {
			name: "Adam", 
			email: "adamsmith@mail.com",
			password: "password1", 
			birthday: "1992-07-30",
			creditCardNumber: "123456789123",
			creditCardOwner: "Adam Smith",
			expirationDate: "2025-03",
			cvv: 456,
			balance: 1100
		}
		await api
			.post("/api/users")
			.send(noLastNameUser)
			.expect(STATUS_BAD_REQUEST)
	})
	test("we can't create a new user without an email address", async() => {
		const noEmailUser = {
			name: "Adam",
			last_name: "Smith", 
			password: "password1", 
			birthday: "1992-07-30",
			creditCardNumber: "123456789123",
			creditCardOwner: "Adam Smith",
			expirationDate: "2025-03",
			cvv: 456,
			balance: 1100
		}
		await api
			.post("/api/users")
			.send(noEmailUser)
			.expect(STATUS_BAD_REQUEST)
	})
	test("we can't create a new user without a password", async() => {
		const noPasswordUser = {
			name: "Adam",
			last_name: "Smith", 
			email: "adamsmith@mail.com", 
			birthday: "1992-07-30",
			creditCardNumber: "123456789123",
			creditCardOwner: "Adam Smith",
			expirationDate: "2025-03",
			cvv: 456,
			balance: 1100
		}
		await api
			.post("/api/users")
			.send(noPasswordUser)
			.expect(STATUS_BAD_REQUEST)
	})
	test("we can't create a new user without a credit card number", async() => {
		const noCreditCardNumberUser = {
			name: "Adam",
			last_name: "Smith", 
			email: "adamsmith@mail.com",
			password: "password1", 
			birthday: "1992-07-30",
			creditCardOwner: "Adam Smith",
			expirationDate: "2025-03",
			cvv: 456,
			balance: 1100
		}
		await api
			.post("/api/users")
			.send(noCreditCardNumberUser)
			.expect(STATUS_BAD_REQUEST)
	})
	test("we can't create a new user without a credit card owner", async() => {
		const nocreditCardOwnerUser = {
			name: "Adam",
			last_name: "Smith", 
			email: "adamsmith@mail.com",
			password: "password1", 
			birthday: "1992-07-30",
			creditCardNumber: "123456789123",
			expirationDate: "2025-03",
			cvv: 456,
			balance: 1100
		}
		await api
			.post("/api/users")
			.send(nocreditCardOwnerUser)
			.expect(STATUS_BAD_REQUEST)
	})
	test("we can't create a new user without an expiration date", async() => {
		const noExpirationDateUser = {
			name: "Adam",
			last_name: "Smith", 
			email: "adamsmith@mail.com",
			password: "password1", 
			birthday: "1992-07-30",
			creditCardNumber: "123456789123",
			creditCardOwner: "Adam Smith",
			cvv: 456,
			balance: 1100
		}
		await api
			.post("/api/users")
			.send(noExpirationDateUser)
			.expect(STATUS_BAD_REQUEST)
	})
	test("we can't create a new user without a cvv", async() => {
		const noCvvUser = {
			name: "Adam",
			last_name: "Smith", 
			email: "adamsmith@mail.com",
			password: "password1", 
			birthday: "1992-07-30",
			creditCardNumber: "123456789123",
			creditCardOwner: "Adam Smith",
			expirationDate: "2025-03",
			balance: 1100
		}
		await api
			.post("/api/users")
			.send(noCvvUser)
			.expect(STATUS_BAD_REQUEST)
	})
	test("we can't create a new user without a balance", async() => {
		const noBalanceUser = {
			name: "Adam",
			last_name: "Smith", 
			email: "adamsmith@mail.com",
			password: "password1", 
			birthday: "1992-07-30",
			creditCardNumber: "123456789123",
			creditCardOwner: "Adam Smith",
			expirationDate: "2025-03",
			cvv: 456,
		}
		await api
			.post("/api/users")
			.send(noBalanceUser)
			.expect(STATUS_BAD_REQUEST)
	})
	test("the password should not have less than six characters", async() => {
		const weakPasswordUser = {
			name: "Adam",
			last_name: "Smith", 
			email: "adamsmith@mail.com",
			password: "wkps", 
			birthday: "1992-07-30",
			creditCardNumber: "123456789123",
			creditCardOwner: "Adam Smith",
			expirationDate: "2025-03",
			cvv: 456,
			balance: 1100
		}
		await api
			.post("/api/users")
			.send(weakPasswordUser)
			.expect(STATUS_BAD_REQUEST)
	})
})

describe.skip("the email should not be already in the data base", () => {
	createOneUser
	test("the email should not be already in the data base", async() => {
		await api
			.post("/api/users")
			.send(userAdam)
			.expect(STATUS_BAD_REQUEST)
	})
})

describe.skip("a new user should be created with the correct data", () => {
	createOneUser
	test("a new user should be created with the correct data", async() => {
		await api
			.post("/api/users")
			.send(userBrian)
			.expect(STATUS_CREATED)
	})
})

describe.skip("update a user", () => {
	createOneUser
	test("we can't modify a user if we don't pass the correct user id", async() => {
		const fakeId = "736dbf4d0bd2da7295f1bad3"
		await api
			.put(`/api/users/${fakeId}`)
			.expect(STATUS_BAD_REQUEST)
	})
	test("an existing user should be updated with the correct data", async() => {
		const updatedUser = {
			name: "Albert", 
			email: "albertsmith@mail.com",
			creditCardOwner: "Albert Smith",
			cvv: 456,
		}
		const getUser = await api.get("/api/users")
		const userId = getUser.body.allUsers[0]._id
		await api
			.put(`/api/users/${userId}`)
			.send(updatedUser)
			.expect(STATUS_OK)
	})
})

describe("we can't delete a user", () => {
	createOneUser
	createOneStadium
	test("we can't delete a user if we don't pass the correct user id", async() => {
		const fakeId = "736dbf4d0bd2da7295f1bad3"
		await api
			.delete(`/api/users/${fakeId}`)
			.expect(STATUS_BAD_REQUEST)
	})
	test("we can't delete a user if he has tickets that he hasn't returned yet", async() => {
		await Ticket.deleteMany({}) 
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
		await api
			.delete(`/api/users/${userId}`)
			.expect(STATUS_BAD_REQUEST)
	})
})

describe.skip("we can delete a user", () => {
	createOneUser
	test("we can delete a user with the correct data", async() => {
		const getUser = await api.get("/api/users")
		const userId = getUser.body.allUsers[0]._id
		await api
			.delete(`/api/users/${userId}`)
			.expect(STATUS_OK)
	})
})

afterAll(() => {
	mongoose.connection.close()
	server.close()
})