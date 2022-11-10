import supertest from "supertest"
import mongoose from "mongoose"
import { app, server } from "../server"

const api = supertest(app)
const STATUS_OK = 200
const STATUS_CREATED = 201
const STATUS_BAD_REQUEST = 400

describe("get all stadiums", () => {
	test("we can see all stadiums", async() => {
		await api
			.get("/api/stadiums")
			.expect(STATUS_OK)
	})
})

describe("create a new stadium", () => {
	test.skip("a new stadium can be created", async() => {
		const newStadium = {
			name: "Stadium 974",
			capacity: 40000,
			ticketsAvailable: 10
		}
		await api
			.post("/api/stadiums")
			.send(newStadium)
			.expect(STATUS_CREATED)
		// const response = await api.get("/api/stadiums")
		// expect(response.body.allStadiums).toHaveLength()
	})
	
	test("a new stadium with no name should not be created", async() => {
		const newStadiumMissingName = {
			capacity: 40000,
			ticketsAvailable: 10
		}
		await api
			.post("/api/stadiums")
			.send(newStadiumMissingName)
			.expect(STATUS_BAD_REQUEST)
	})

	test("a new stadium with no ticketsAvailable should not be created", async() => {
		const newStadiumMissingName = {
			name: "Stadium 974",
			capacity: 40000,
		}
		await api
			.post("/api/stadiums")
			.send(newStadiumMissingName)
			.expect(STATUS_BAD_REQUEST)
	})

	test("a stadium with a name that is in the data base, should not be created", async() => {
		const newStadiumExistingName = {
			name: "Ahmad Bin Ali",
			capacity: 40000,
			ticketsAvailable: 10
		}
		await api
			.post("/api/stadiums")
			.send(newStadiumExistingName)
			.expect(STATUS_BAD_REQUEST)
	})
})

describe("modify a stadium", () => {
	test("we can't modify a stadium if we don't pass the correct stadium id", async() => {
		const updateStadium = {
			ticketsAvailable: 20
		}
		const fakeId = "636a824497bb882607b4487d"
		await api
			.put(`/api/stadiums/${fakeId}`)
			.send(updateStadium)
			.expect(STATUS_BAD_REQUEST)
	})
})



afterAll(() => {
	mongoose.connection.close()
	server.close()
})