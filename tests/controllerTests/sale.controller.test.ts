import request from 'supertest'
import app from '../../src/index'

const HEADER = 'auth-token'
const TOKEN =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbmFoaTFAYWRtaW4uY29tIiwiaWF0IjoxNjY3OTQyMjkyfQ.5eDIGLdczz3ceDGrLzLSacv4-nKZujUittOrg-6XkuA'

describe('Sale controller test: ticket sale and ticket refund', () => {
	it('The ticket sale (POST) code status must be 201', async () => {
		const response = await request(app)
			.post('/api/sales')
			.send({
				idUser: 5,
				idTicket: 10,
			})
			.set(HEADER, TOKEN)
		expect(response.status).toEqual(201)
	})

	it('The ticket refund (POST) code status must be 200', async () => {
		const response = await request(app)
			.post('/api/sales/refund')
			.send({
				idUser: 5,
				idTicket: 10,
			})
			.set(HEADER, TOKEN)
		expect(response.status).toEqual(200)
	})
})
