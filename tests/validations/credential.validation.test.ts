import validationCredential from '../../src/validations/credential.validation'

describe('Credential validation test', () => {
	it('The data must be correct', async () => {
		const isValid = await validationCredential.validate({
			email: 'email@gmail.com',
			password: 'password',
		})
		expect(isValid).toBeTruthy()
	})
})
