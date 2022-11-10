const supertest = require('supertest')
const app = require('../index')
const api = supertest(app)
test('Get Endpoints', async () => {
  await api.get('/v1/users').send().expect(200)
})



