import request from 'supertest'
import app from '../../src/index'

const ID = 7
const HEADER = 'auth-token'
const TOKEN =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbmFoaTFAYWRtaW4uY29tIiwiaWF0IjoxNjY3OTQyMjkyfQ.5eDIGLdczz3ceDGrLzLSacv4-nKZujUittOrg-6XkuA'

describe('User controller test: CRUD user', () => {
	it('Get all users request (GET) code status must be 200', async () => {
		const response = await request(app).get('/api/users/').set(HEADER, TOKEN)
		expect(response.status).toEqual(200)
	})

	it('Get one user request (GET) code status must be 200', async () => {
		const response = await request(app)
			.get(`/api/users/${ID}`)
			.set(HEADER, TOKEN)
		expect(response.status).toEqual(200)
	})

	it('Update one user request (PUT) code status must be 200', async () => {
		const response = await request(app)
			.put(`/api/users/${ID}`)
			.send({
				name: 'Florencia',
				age: 25,
				email: 'florencia@gmail.com',
				password: 'FLorr123*',
				birthday: '1977/05/11',
				lastname: 'Rosales',
			})
			.set(HEADER, TOKEN)
		expect(response.status).toEqual(200)
	})

	it('Remove one user request (DELETE) code status must be 200', async () => {
		const response = await request(app)
			.delete(`/api/users/${ID}`)
			.set(HEADER, TOKEN)
		expect(response.status).toEqual(200)
	})
})
