import userService from '../../src/services/user.service'
import { mock, when } from 'ts-mockito'
import { QueryResult } from 'pg'

describe('Test auth service', () => {
	it('POST', async () => {
		const PAYLOAD = {
			user: {
				name: 'User',
				age: 25,
				email: 'test@gmail.com',
				password: 'Admin1234*',
				birthday: new Date(),
				created: new Date(),
				lastname: 'Lastname',
			},
			card: {
				name_card: 'visa',
				expiration: '09/25',
				created: new Date(),
				balance: 5000,
				cvv: 334,
				number: '4916158594921935',
			},
		}

		const USER_SAVED_DB: QueryResult<any> = {
			command: 'COMMIT',
			rowCount: 0,
			oid: 0,
			rows: [],
			fields: [],
		}

		const userServiceMock: typeof userService = mock(userService)

		when(userServiceMock.postUser(PAYLOAD.user, PAYLOAD.card)).thenResolve(
			USER_SAVED_DB
		)

		const userSaved = await userService.postUser(PAYLOAD.user, PAYLOAD.card)
		expect(userSaved).toMatchObject(USER_SAVED_DB)
	})
})
