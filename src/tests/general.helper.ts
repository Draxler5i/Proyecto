import supertest from "supertest"
import Stadium from "../models/Stadium"
import Ticket from "../models/Ticket"
import User from "../models/User"
import { app } from "../server"

const api = supertest(app)

const STATUS_OK = 200
const STATUS_CREATED = 201
const STATUS_NO_CONTENT = 204
const STATUS_BAD_REQUEST = 400

const cleanDB = beforeAll(async () => {
	await User.deleteMany({})
	await Stadium.deleteMany({})
	await Ticket.deleteMany({})
})
export {
	api,
	STATUS_OK,
	STATUS_CREATED,
	STATUS_NO_CONTENT,
	STATUS_BAD_REQUEST,
	cleanDB
}