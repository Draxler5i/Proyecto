import supertest from "supertest"
import mongoose from "mongoose"
import User from "../models/User"
import { app, server } from "../server"

const api = supertest(app)
const STATUS_OK = 200
const STATUS_CREATED = 201
const STATUS_NO_CONTENT = 204
const STATUS_BAD_REQUEST = 400

describe("get all users", () => {
	test.skip("we can see all users", async() => {
		await api
			.get("/api/users")
			.expect(STATUS_OK)
	})
	test.skip("when there are no users we should get a No Content Status", async () => {
		await User.deleteMany({timestamps: true})
		await api
			.get("/api/users")
			.expect(STATUS_NO_CONTENT)
	})
})

describe("create a new user", () => {
	test.skip("we can't create a new user without a name", async() => {
		const newUser = {
			last_name: "Adams", 
			email: "brianadmas@mail.com",
			password: "password2", 
			birthday: "1984-05-21",
			creditCardNumber: "123456789123",
			creditCardOwner: "Brian Adams",
			expirationDate: "2026-04",
			cvv: "456",
			balance: 4000
		}
		await api
			.post("/api/users")
			.send(newUser)
			.expect(STATUS_BAD_REQUEST)
	})
	test.skip("we can't create a new user without a last name", async() => {
		const newUser = {
			name: "Brian", 
			email: "brianadmas@mail.com",
			password: "password2", 
			birthday: "1984-05-21",
			creditCardNumber: "123456789123",
			creditCardOwner: "Brian Adams",
			expirationDate: "2026-04",
			cvv: "456",
			balance: 4000
		}
		await api
			.post("/api/users")
			.send(newUser)
			.expect(STATUS_BAD_REQUEST)
	})
	test.skip("we can't create a new user without an email address", async() => {
		const newUser = {
			name: "Brian",
			last_name: "Adams",
			password: "password2", 
			birthday: "1984-05-21",
			creditCardNumber: "123456789123",
			creditCardOwner: "Brian Adams",
			expirationDate: "2026-04",
			cvv: "456",
			balance: 4000
		}
		await api
			.post("/api/users")
			.send(newUser)
			.expect(STATUS_BAD_REQUEST)
	})
	test.skip("we can't create a new user without a password", async() => {
		const newUser = {
			name: "Brian",
			last_name: "Adams", 
			email: "brianadmas@mail.com",  
			birthday: "1984-05-21",
			creditCardNumber: "123456789123",
			creditCardOwner: "Brian Adams",
			expirationDate: "2026-04",
			cvv: "456",
			balance: 4000
		}
		await api
			.post("/api/users")
			.send(newUser)
			.expect(STATUS_BAD_REQUEST)
	})
	test.skip("we can't create a new user without a credit card number", async() => {
		const newUser = {
			name: "Brian",
			last_name: "Adams", 
			email: "brianadmas@mail.com",
			password: "password2", 
			birthday: "1984-05-21",
			creditCardOwner: "Brian Adams",
			expirationDate: "2026-04",
			cvv: "456",
			balance: 4000
		}
		await api
			.post("/api/users")
			.send(newUser)
			.expect(STATUS_BAD_REQUEST)
	})
	test.skip("we can't create a new user without a credit card owner", async() => {
		const newUser = {
			name: "Brian",
			last_name: "Adams", 
			email: "brianadmas@mail.com",
			password: "password2", 
			birthday: "1984-05-21",
			creditCardNumber: "123456789123",
			expirationDate: "2026-04",
			cvv: "456",
			balance: 4000
		}
		await api
			.post("/api/users")
			.send(newUser)
			.expect(STATUS_BAD_REQUEST)
	})
	test.skip("we can't create a new user without an expiration date", async() => {
		const newUser = {
			name: "Brian",
			last_name: "Adams", 
			email: "brianadmas@mail.com",
			password: "password2", 
			birthday: "1984-05-21",
			creditCardNumber: "123456789123",
			creditCardOwner: "Brian Adams",
			cvv: "456",
			balance: 4000
		}
		await api
			.post("/api/users")
			.send(newUser)
			.expect(STATUS_BAD_REQUEST)
	})
	test.skip("we can't create a new user without a cvv", async() => {
		const newUser = {
			name: "Brian",
			last_name: "Adams", 
			email: "brianadmas@mail.com",
			password: "password2", 
			birthday: "1984-05-21",
			creditCardNumber: "123456789123",
			creditCardOwner: "Brian Adams",
			expirationDate: "2026-04",
			balance: 4000
		}
		await api
			.post("/api/users")
			.send(newUser)
			.expect(STATUS_BAD_REQUEST)
	})
	test.skip("we can't create a new user without a balance", async() => {
		const newUser = {
			name: "Brian",
			last_name: "Adams", 
			email: "brianadmas@mail.com",
			password: "password2", 
			birthday: "1984-05-21",
			creditCardNumber: "123456789123",
			creditCardOwner: "Brian Adams",
			expirationDate: "2026-04",
			cvv: "456"
		}
		await api
			.post("/api/users")
			.send(newUser)
			.expect(STATUS_BAD_REQUEST)
	})
	test.skip("the password should not have less than six characters", async() => {
		const newUser = {
			name: "Brian",
			last_name: "Adams", 
			email: "brianadmas@mail.com",
			password: "weakp", 
			birthday: "1984-05-21",
			creditCardNumber: "123456789123",
			creditCardOwner: "Brian Adams",
			expirationDate: "2026-04",
			cvv: "456"
		}
		await api
			.post("/api/users")
			.send(newUser)
			.expect(STATUS_BAD_REQUEST)
	})
	test.skip("the email should not be already in the data base", async() => {
		const user1 = {
			name: "Brian",
			last_name: "Adams", 
			email: "mymailba@mail.com",
			password: "password1", 
			birthday: "1984-05-21",
			creditCardNumber: "123456789123",
			creditCardOwner: "Brian Adams",
			expirationDate: "2026-04",
			cvv: "456",
			balance: 4000
		}
		const user2 = {
			name: "Bill",
			last_name: "Abbey", 
			email: "mymailba@mail.com",
			password: "password1", 
			birthday: "1984-05-21",
			creditCardNumber: "123456789123",
			creditCardOwner: "Bill Abbey",
			expirationDate: "2026-04",
			cvv: "456",
			balance: 4000
		}
		await User.deleteMany({timestamps: true})
		const newUser = new User(user1)
		await newUser.save()
		await api
			.post("/api/users")
			.send(user2)
			.expect(STATUS_BAD_REQUEST)
	})
	test.skip("a new user should be created with the correct data", async() => {
		const newUser = {
			name: "Brian",
			last_name: "Adams", 
			email: "brianadams@mail.com",
			password: "password1", 
			birthday: "1984-05-21",
			creditCardNumber: "123456789123",
			creditCardOwner: "Brian Adams",
			expirationDate: "2026-04",
			cvv: "456",
			balance: 4000
		}
		await User.deleteMany({timestamps: true})
		await api
			.post("/api/users")
			.send(newUser)
			.expect(STATUS_CREATED)
	})
})

describe("update a user", () => {
	test.skip("we can't modify a user if we don't pass the correct user id", async() => {
		const fakeId = "636c1e686beb3997ac7e58c3"
		await api
			.put(`/api/users/${fakeId}`)
			.expect(STATUS_BAD_REQUEST)
	})
	test.skip("an existing user should be updated with the correct data", async() => {
		const user = {
			name: "Brian",
			last_name: "Adams", 
			email: "brianadams@mail.com",
			password: "password1", 
			birthday: "1984-05-21",
			creditCardNumber: "123456789123",
			creditCardOwner: "Brian Adams",
			expirationDate: "2026-04",
			cvv: "456",
			balance: 4000
		}
		await User.deleteMany({timestamps: true})
		const newUser = new User(user)
		await newUser.save()
		const userId= newUser._id
		const updateUser = {
			name: "Willy"
		}
		await api
			.put(`/api/users/${userId}`)
			.send(updateUser)
			.expect(STATUS_OK)
	})
})

describe("delete a user", () => {
	test.skip("we can't delete a user if we don't pass the correct user id", async() => {
		const fakeId = "636c1e686beb3997ac7e58c3"
		await api
			.delete(`/api/users/${fakeId}`)
			.expect(STATUS_BAD_REQUEST)
	})
	// test("we can't delete a user if he has tickets that he hasn't returned yet", async() => {
	// 	const fakeId = "636c1e686beb3997ac7e58c3"
	// 	await api
	// 		.delete(`/api/users/${fakeId}`)
	// 		.expect(STATUS_BAD_REQUEST)
	// })
	test("we can delete a user with the correct data", async() => {
		const user = {
			name: "Brian",
			last_name: "Adams", 
			email: "brianadams@mail.com",
			password: "password1", 
			birthday: "1984-05-21",
			creditCardNumber: "123456789123",
			creditCardOwner: "Brian Adams",
			expirationDate: "2026-04",
			cvv: "456",
			balance: 4000
		}
		await User.deleteMany({timestamps: true})
		const newUser = new User(user)
		await newUser.save()
		const id = newUser._id
		await api
			.delete(`/api/users/${id}`)
			.expect(STATUS_OK)
	})
})

afterAll(() => {
	mongoose.connection.close()
	server.close()
})