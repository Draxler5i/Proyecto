import validationUser from '../../src/validations/user.validation'

describe('User validation test', () => {
	it('The data must be correct', async () => {
		const isValid = await validationUser.validate({
			name: 'Fernando',
			lastname: 'Suarez',
			age: 22,
			email: 'fernando@gmail.com',
			password: 'ferNan45*',
			birthday: '2000/05/25',
		})
		expect(isValid).toBeTruthy()
	})
})
