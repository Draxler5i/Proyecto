import request from 'supertest'
import app from '../index'

describe('GET USERS', () => {
	it('USERS', async () => {
		request(app).get('/api/users').send().expect(200)
	})
})
