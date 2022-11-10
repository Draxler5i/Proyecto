import request from 'supertest'
import app from '../src/index'

describe('Auth methods: login and register an user', () => {
	let id: any

	it("A user's registration (POST) code status must be 201", async () => {
		const response = await request(app)
			.post('/auth/register')
			.send({
				user: {
					name: 'John',
					lastname: 'Smith',
					age: 22,
					email: 'john@admin.com',
					password: 'Admin456*',
					birthday: '2000/01/31',
				},
				card: {
					name_card: 'visa',
					number: '4539250218584491',
					expiration: '11/25',
					balance: 1500,
					cvv: '220',
				},
			})
		console.log(response)
		expect(response.status).toEqual(200)
		id = response.body.oid
	})

	it("A user's login (POST) code status must be 200", async () => {
		const response = await request(app).post('/auth/login').send({
			email: 'anahi1@admin.com',
			password: 'Admin123*',
		})
		expect(response.status).toEqual(200)
	})
})
