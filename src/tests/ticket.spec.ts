import mongoose from "mongoose"
import { server } from "../server"
import { api, STATUS_OK, STATUS_CREATED, STATUS_NO_CONTENT, STATUS_BAD_REQUEST, cleanDB} from "./general.helper"
import { createOneUser } from "./user.helper"
import { createOneStadium } from "./stadium.helper"
import { createOneTicket } from "./ticket.helper"
import Ticket from "../models/Ticket"

cleanDB

describe.skip("get all tickets", () => {
	createOneUser
	createOneStadium
	createOneTicket
	test("we can get all tickets", async () => {
		await api
			.get("/api/tickets")
			.expect(STATUS_OK)
	})
})

describe.skip("when there are no users we should get a No Content Status", () => {
	test("when there are no users we should get a No Content Status", async () => {
		await Ticket.deleteMany({})
		await api
			.get("/api/tickets")
			.expect(STATUS_NO_CONTENT)
	})
})

describe.skip("buy a ticket", () => {
	let jwtToken = ""
	const validCredentials = {
		email: "adamsmith@mail.com",
		password: "password1" 
	}

	beforeAll(async () => {
		const response = await api.post("/api/login").send(validCredentials)
		jwtToken = response.body.token
	})

	test.skip("a user can buy a new ticket", async() => {
		const newTicket = {
			price: 100,
			currency: "$",
			match_day: "2022-11-05",
			stadium_id: "636a824497bb882607b4487e",
			stadium_name: "Ahmad Bin Ali",
			seat: "4 B-3",
			user_id: "636d1154a8449aaf3d18c02b"
		}
		await api
			.post("/api/tickets")
			.set("Authorization", `Bearer ${jwtToken}`)
			.send(newTicket)
			.expect(STATUS_CREATED)
	})
	test("a user can't buy a ticket if we don't receive the price", async() => {
		const newTicket = {
			currency: "$",
			match_day: "2022-11-05",
			stadium_id: "636a824497bb882607b4487e",
			stadium_name: "Ahmad Bin Ali",
			seat: "5 B-3",
			user_id: "636d1154a8449aaf3d18c02b"
		}
		await api
			.post("/api/tickets")
			.set("Authorization", `Bearer ${jwtToken}`)
			.send(newTicket)
			.expect(STATUS_BAD_REQUEST)
	})
	test("a user can't buy a ticket if we don't receive the currency", async() => {
		const newTicket = {
			price: 100,
			match_day: "2022-11-05",
			stadium_id: "636a824497bb882607b4487e",
			stadium_name: "Ahmad Bin Ali",
			seat: "5 B-3",
			user_id: "636d1154a8449aaf3d18c02b"
		}
		await api
			.post("/api/tickets")
			.set("Authorization", `Bearer ${jwtToken}`)
			.send(newTicket)
			.expect(STATUS_BAD_REQUEST)
	})
	test("a user can't buy a ticket if we don't receive the match day", async() => {
		const newTicket = {
			price: 100,
			currency: "$",
			stadium_id: "636a824497bb882607b4487e",
			stadium_name: "Ahmad Bin Ali",
			seat: "5 B-3",
			user_id: "636d1154a8449aaf3d18c02b"
		}
		await api
			.post("/api/tickets")
			.set("Authorization", `Bearer ${jwtToken}`)
			.send(newTicket)
			.expect(STATUS_BAD_REQUEST)
	})
	test("a user can't buy a ticket if we don't receive the stadium_id", async() => {
		const newTicket = {
			price: 100,
			currency: "$",
			match_day: "2022-11-05",
			stadium_name: "Ahmad Bin Ali",
			seat: "5 B-3",
			user_id: "636d1154a8449aaf3d18c02b"
		}
		await api
			.post("/api/tickets")
			.set("Authorization", `Bearer ${jwtToken}`)
			.send(newTicket)
			.expect(STATUS_BAD_REQUEST)
	})
	test("a user can't buy a ticket if we don't receive the seat number", async() => {
		const newTicket = {
			price: 100,
			currency: "$",
			match_day: "2022-11-05",
			stadium_id: "636a824497bb882607b4487e",
			stadium_name: "Ahmad Bin Ali",
			user_id: "636d1154a8449aaf3d18c02b"
		}
		await api
			.post("/api/tickets")
			.set("Authorization", `Bearer ${jwtToken}`)
			.send(newTicket)
			.expect(STATUS_BAD_REQUEST)
	})
	test("a user can't buy a ticket if we don't receive the user_id", async() => {
		const newTicket = {
			price: 100,
			currency: "$",
			match_day: "2022-11-05",
			stadium_id: "636a824497bb882607b4487e",
			stadium_name: "Ahmad Bin Ali",
			seat: "5 B-3",
		}
		await api
			.post("/api/tickets")
			.set("Authorization", `Bearer ${jwtToken}`)
			.send(newTicket)
			.expect(STATUS_BAD_REQUEST)
	})
})

describe.skip("user sends the wrong data", () => {
	let jwtToken = ""
	const validCredentials = {
		email: "adamsmith@mail.com",
		password: "password1" 
	}

	beforeAll(async () => {
		const response = await api.post("/api/login").send(validCredentials)
		jwtToken = response.body.token
	})
	test.skip("a user can't buy a ticket if we receive the wrong user_id", async() => {
		const fakeTicket = {
			price: 100,
			currency: "$",
			match_day: "2022-11-05",
			stadium_id: "636a824497bb882607b4487e",
			stadium_name: "Ahmad Bin Ali",
			seat: "5 B-3",
			user_id: "636d1154a8449aaf3d18c02c"
		}
		await api
			.post("/api/tickets")
			.set("Authorization", `Bearer ${jwtToken}`)
			.send(fakeTicket)
			.expect(STATUS_BAD_REQUEST)
	})
	test.skip("a user can't buy a ticket if we receive the wrong stadium_id", async() => {
		const fakeTicket = {
			price: 100,
			currency: "$",
			match_day: "2022-11-05",
			stadium_id: "636a824497bb882607b4487f",
			stadium_name: "Ahmad Bin Ali",
			seat: "5 B-3",
			user_id: "636d1154a8449aaf3d18c02b"
		}
		await api
			.post("/api/tickets")
			.set("Authorization", `Bearer ${jwtToken}`)
			.send(fakeTicket)
			.expect(STATUS_BAD_REQUEST)
	})
	test.skip("a user can't buy a ticket if his balance is less than the price of the ticket", async() => {
		const fakeTicket = {
			price: 1000,
			currency: "$",
			match_day: "2022-11-05",
			stadium_id: "636a824497bb882607b4487f",
			stadium_name: "Ahmad Bin Ali",
			seat: "5 B-3",
			user_id: "636d1154a8449aaf3d18c02b"
		}
		await api
			.post("/api/tickets")
			.set("Authorization", `Bearer ${jwtToken}`)
			.send(fakeTicket)
			.expect(STATUS_BAD_REQUEST)
	})
	test.skip("a user can't buy a ticket if he has already purchased 10 tickets", async() => {
		const fakeTicket = {
			price: 100,
			currency: "$",
			match_day: "2022-11-05",
			stadium_id: "636a825897bb882607b44880",
			stadium_name: "Ahmad Bin Ali",
			seat: "5 B-3",
			user_id: "636d1154a8449aaf3d18c02b"
		}
		await api
			.post("/api/tickets")
			.set("Authorization", `Bearer ${jwtToken}`)
			.send(fakeTicket)
			.expect(STATUS_BAD_REQUEST)
	})
	test("a user can't buy a ticket if the stadium has no more tickets available", async() => {
		const fakeTicket = {
			price: 100,
			currency: "$",
			match_day: "2022-11-05",
			stadium_id: "636a825897bb882607b44880",
			stadium_name: "Ahmad Bin Ali",
			seat: "5 B-3",
			user_id: "636d1154a8449aaf3d18c02b"
		}
		await api
			.post("/api/tickets")
			.set("Authorization", `Bearer ${jwtToken}`)
			.send(fakeTicket)
			.expect(STATUS_BAD_REQUEST)
	})
})

describe.skip("updating a ticket", () => {
	const id = "636d23685ddc380b58e9c39e"
	test("we can't modify a ticket if we don't pass the correct ticket id", async() => {
		const fakeId = "736d23685ddc380b58e9c39e"
		await api
			.put(`/api/tickets/${fakeId}`)
			.expect(STATUS_BAD_REQUEST)
	})
	test("we can't modify the price field on a ticket", async() => {
		const badTicket = {
			price: 200
		}
		await api
			.put(`/api/tickets/${id}`)
			.send(badTicket)
			.expect(STATUS_BAD_REQUEST)
	})
	test("we can't modify the currency field on a ticket", async() => {
		const badTicket = {
			currency: "Bs"
		}
		await api
			.put(`/api/tickets/${id}`)
			.send(badTicket)
			.expect(STATUS_BAD_REQUEST)
	})
	test("we can't modify the match_day field on a ticket", async() => {
		const badTicket = {
			match_day: "2023-11-05"
		}
		await api
			.put(`/api/tickets/${id}`)
			.send(badTicket)
			.expect(STATUS_BAD_REQUEST)
	})
	test("we can't modify the stadium_id field on a ticket", async() => {
		const badTicket = {
			stadium_id: "736d4aee6474a00b8f84945e"
		}
		await api
			.put(`/api/tickets/${id}`)
			.send(badTicket)
			.expect(STATUS_BAD_REQUEST)
	})
	test("we can't modify the stadium_name field on a ticket", async() => {
		const badTicket = {
			stadium_name: "Al Thumama"
		}
		await api
			.put(`/api/tickets/${id}`)
			.send(badTicket)
			.expect(STATUS_BAD_REQUEST)
	})
	test("we can't modify the user_id field on a ticket", async() => {
		const badTicket = {
			user_id: "736d1154a8449aaf3d18c02b"
		}
		await api
			.put(`/api/tickets/${id}`)
			.send(badTicket)
			.expect(STATUS_BAD_REQUEST)
	})
	test("we can modify the seat field on a ticket", async() => {
		const goodTicket = {
			seat: "20 B-4"
		}
		await api
			.put(`/api/tickets/${id}`)
			.send(goodTicket)
			.expect(STATUS_OK)
	})
})

describe.skip("delete a ticket", () => {
	let jwtToken = ""
	const validCredentials = {
		email: "adamsmith@mail.com",
		password: "password1" 
	}

	beforeAll(async () => {
		const response = await api.post("/api/login").send(validCredentials)
		jwtToken = response.body.token
	})

	test.skip("we can't delete a ticket if we don't pass the correct ticket id", async() => {
		const fakeId = "736d23685ddc380b58e9c39e"
		await api
			.delete(`/api/tickets/${fakeId}`)
			.set("Authorization", `Bearer ${jwtToken}`)
			.expect(STATUS_BAD_REQUEST)
	})
	test("we can delete a ticket if we pass the correct ticket id", async() => {
		const realId = "636d23685ddc380b58e9c39e"
		await api
			.delete(`/api/tickets/${realId}`)
			.set("Authorization", `Bearer ${jwtToken}`)
			.expect(STATUS_OK)
	})
})

afterAll(() => {
	mongoose.connection.close()
	server.close()
})