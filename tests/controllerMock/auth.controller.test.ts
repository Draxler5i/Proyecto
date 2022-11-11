import request from 'supertest'
import app from '../../src/index'
import userService from '../../src/services/user.service'
import validateUser from '../../src/validations/user.validation'
import validateCard from '../../src/validations/creditCard.validation'
import encryptor from '../../src/security/encrypt'
import { mock, when } from 'ts-mockito'
import { QueryResult } from 'pg'

describe('Auth Controller, verify http methods', () => {
	it('It should return a new user created', async () => {
		try {
			const PAYLOAD_REQ = {
				user: {
					name: 'User',
					age: 25,
					email: 'test@gmail.com',
					password: 'admin1234',
					birthday: new Date(),
					created: new Date(),
					lastname: 'Lastname',
				},
				card: {
					name_card: 'BNB',
					expiration: '12/24',
					created: new Date(),
					balance: 5000,
					cvv: 123,
					number: '1234-0945-4569-6789',
				},
			}
			const USER_ROWS: any = []
			const PASSWORD_ENCRIPTED = 'xcnmn21b3213.asdnsadbm'
			const NEW_DATE = new Date()
			const USER_SAVED_DB: QueryResult<any> = {
				rows: [
					{
						user_id: 123,
						name: 'User',
						age: 25,
						email: 'test@gmail.com',
						password: 'admin1234',
						birthday: NEW_DATE,
						created: NEW_DATE,
						lastname: 'Lastname',
						card_id: 123,
					},
				],
				command: '',
				rowCount: 1,
				oid: 12345,
				fields: [],
			}

			const validateUserMock: typeof validateUser = mock(validateUser)
			const validateCardMock: typeof validateCard = mock(validateCard)
			const encryptorMock: typeof encryptor = mock(encryptor)
			const userServiceMock: typeof userService = mock(userService)

			when(validateUserMock.isValid(PAYLOAD_REQ.user.email)).thenResolve(
				true
			)
			when(validateCardMock.isValid(PAYLOAD_REQ.card)).thenResolve(true)
			when(userServiceMock.existUser(PAYLOAD_REQ.user.email)).thenResolve(
				USER_ROWS
			)
			when(encryptorMock.encrypt(PAYLOAD_REQ.user.password)).thenResolve(
				PASSWORD_ENCRIPTED
			)
			when(
				userServiceMock.postUser(PAYLOAD_REQ.user, PAYLOAD_REQ.card)
			).thenResolve(USER_SAVED_DB)

			const response = await request(app)
				.post('/api/users')
				.send(PAYLOAD_REQ)

			expect(response.body).toMatchObject({
				status: 'OK',
				data: {
					user_id: 123,
					name: 'User',
					age: 25,
					email: 'test@gmail.com',
					password: 'admin1234',
					birthday: NEW_DATE,
					created: NEW_DATE,
					lastname: 'Lastname',
					card_id: 123,
				},
				message: 'User created',
			})
			expect(response.status).toEqual(201)
		} catch (error) {
			console.log('ERROR TESTING:\n', error)
		}
	})
})
