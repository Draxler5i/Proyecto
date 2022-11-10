import request from 'supertest'
import app from '../../src/index'
import userService = require('../../src/services/user.service')

jest.mock('../../src/services/user.service')

describe('Auth methods: login and register an user', () => {
	afterAll(() => {
		jest.resetAllMocks()
	})

	it("A user's registration (POST) code status must be 201", async () => {
		userService.mockReturnValueOnce()
		const response = await request(app)
			.post('/auth/register')
			.send({
				user: {
					name: 'Flor',
					lastname: 'Rosas',
					age: 25,
					email: 'flor@gmail.com',
					password: 'Florr456*',
					birthday: '1997/05/11',
				},
				card: {
					name_card: 'visa',
					number: '4539250218584491',
					expiration: '11/25',
					balance: 1500,
					cvv: '220',
				},
			})
		expect(response.status).toEqual(201)
	})

	it("A user's login (POST) code status must be 200", async () => {
		const response = await request(app).post('/auth/login').send({
			email: 'anahi1@admin.com',
			password: 'Admin123*',
		})
		expect(response.body.token?.length).toBeGreaterThan(0)
		expect(response.status).toEqual(200)
	})
})
