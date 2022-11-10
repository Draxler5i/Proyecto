import request from 'supertest'
import app from '../../src/index'

const ID = 11
const HEADER = 'auth-token'
const TOKEN =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbmFoaTFAYWRtaW4uY29tIiwiaWF0IjoxNjY3OTQyMjkyfQ.5eDIGLdczz3ceDGrLzLSacv4-nKZujUittOrg-6XkuA'

describe('Ticket controller test: CRUD ticket', () => {
	it('Get all tickets request (GET) code status must be 200', async () => {
		const response = await request(app)
			.get('/api/tickets/')
			.set(HEADER, TOKEN)
		expect(response.status).toEqual(200)
	})

	it('Get one ticket request (GET) code status must be 200', async () => {
		const response = await request(app)
			.get(`/api/tickets/${ID}`)
			.set(HEADER, TOKEN)
		expect(response.status).toEqual(200)
	})

	it('Save one ticket request (POST) code status must be 201', async () => {
		const response = await request(app)
			.post('/api/tickets/')
			.send({
				price: 180,
				currency: 'Bs',
				matchDay: '2022/12/31',
				idStadium: 1,
			})
			.set(HEADER, TOKEN)
		expect(response.status).toEqual(201)
	})

	it('Update one ticket request (PUT) code status must be 200', async () => {
		const response = await request(app)
			.put(`/api/tickets/${ID}`)
			.send({
				price: 150,
				currency: 'Bs',
				matchDay: '2022/12/30',
				IDStadium: 1,
				state: false,
			})
			.set(HEADER, TOKEN)
		expect(response.status).toEqual(200)
	})

	it('Remove one ticket request (DELETE) code status must be 200', async () => {
		const response = await request(app)
			.delete(`/api/tickets/${ID}`)
			.set(HEADER, TOKEN)
		expect(response.status).toEqual(200)
	})
})
