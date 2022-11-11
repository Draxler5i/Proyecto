import mongoose from "mongoose"
import { server } from "../server"
import { api, STATUS_OK, STATUS_CREATED, STATUS_BAD_REQUEST, cleanDB} from "./general.helper"
import { stadiumAhmad, stadiumJanoub, createOneStadium} from "./stadium.helper"

cleanDB

describe.skip("get all stadiums", () => {
	createOneStadium
	test("we get all stadiums", async() => {
		await api
			.get("/api/stadiums")
			.expect(STATUS_OK)
	})
})

describe.skip("we can't create a new stadium", () => {
	createOneStadium
	test("a new stadium with no name should not be created", async() => {
		const stadiumMissingName = {
			capacity: 40000,
			ticketsAvailable: 10
		}
		await api
			.post("/api/stadiums")
			.send(stadiumMissingName)
			.expect(STATUS_BAD_REQUEST)
	})
	test("a new stadium with no ticketsAvailable should not be created", async() => {
		const stadiumMissingTickets = {
			name: "Stadium 974",
			capacity: 40000,
		}
		await api
			.post("/api/stadiums")
			.send(stadiumMissingTickets)
			.expect(STATUS_BAD_REQUEST)
	})
	test("a stadium with a name that is already in the data base, should not be created", async() => {
		await api
			.post("/api/stadiums")
			.send(stadiumAhmad)
			.expect(STATUS_BAD_REQUEST)
	})
})

describe.skip("we can create a new stadium", () => {
	createOneStadium
	test("a new stadium can be created with the correct data", async() => {
		await api
			.post("/api/stadiums")
			.send(stadiumJanoub)
			.expect(STATUS_CREATED)
	})
})

describe.skip("we can't modify a stadium if we don't pass the correct stadium id", () => {
	createOneStadium
	test("we can't modify a stadium if we don't pass the correct stadium id", async() => {
		const fakeId = "736d9ff001f4ae05000f1697"
		const updateTickets = {
			ticketsAvailable: 20
		}
		await api
			.put(`/api/stadiums/${fakeId}`)
			.send(updateTickets)
			.expect(STATUS_BAD_REQUEST)
	})
})

describe.skip("we can't modify a stadium's name or a stadium's capacity", () => {
	createOneStadium
	test("we can't modify a stadium's name", async() => {
		const updateName = {
			name: "Stadium 974"
		}
		const getStadiums = await api.get("/api/stadiums")
		const stadiumId = getStadiums.body.allStadiums[0]._id
		await api
			.put(`/api/stadiums/${stadiumId}`)
			.send(updateName)
			.expect(STATUS_BAD_REQUEST)
	})
	test("we can't modify a stadium's capacity", async() => {
		const updateCapacity = {
			capacity: 50000
		}
		const getStadiums = await api.get("/api/stadiums")
		const stadiumId = getStadiums.body.allStadiums[0]._id
		await api
			.put(`/api/stadiums/${stadiumId}`)
			.send(updateCapacity)
			.expect(STATUS_BAD_REQUEST)
	})
})

describe("we can modify a stadium's tickets availability", () => {
	createOneStadium
	test("we can modify a stadium's tickets availability", async() => {
		const updateTickets = {
			ticketsAvailable: 20
		}
		const getStadiums = await api.get("/api/stadiums")
		const stadiumId = getStadiums.body.allStadiums[0]._id
		await api
			.put(`/api/stadiums/${stadiumId}`)
			.send(updateTickets)
			.expect(STATUS_OK)
	})
})

afterAll(() => {
	mongoose.connection.close()
	server.close()
})