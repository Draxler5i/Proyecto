const supertest = require('supertest')
const app = require('../index')
const api = supertest(app)

describe("UserService", () => {
  describe("getUsers", () => {
    test("should return status 200", async () => {
      await api.get('/v1/users').expect(200)
    })
    test("Create user", async () => {
      const user =
      {
        name: "Josh",
        last_name: "Merida",
        email: "josh_16@gmail.com",
        password: "jmer@12M",
        age: 18,
        nit: "6948466",
        card_number: "3657889412578",
        card_name: "josh merida",
        expiration: "2023-05-02",
        cvv: 456,
        saldo: 2000
      }

      const create_user = await api.post('/v1/users').send(user)

      expect(create_user).toEqual(
        expect.objectContaining({
          text: `User added with user name: Josh, lastname: Merida, email: josh_16@gmail.com, age: 18, nit: 6948466, card name: josh merida, expiration: Tue May 02 2023 00:00:00 GMT-0600 (hora estándar central)`
        })
      )
    })
  })
  describe("Delete User", () => {
    test('should return 400', async () => {
      await api.delete('/v1/users/111').expect(400)
    })
    test('should return error message', async () => {
      const userDeleted = await api.delete('/v1/users/113')
      expect(userDeleted).toEqual(
        expect.objectContaining({ text: 'An error occured when trying to DELETE user' })
      )
    })
    test('should return message deleted with success', async () => {
      const userDeleted = await api.delete('/v1/users/155')
      expect(userDeleted).toEqual(
        expect.objectContaining({ text: `User deleted with ID: 155` })
      )
    })
  })
})