import validationCreditCard from '../../src/validations/creditCard.validation'

describe('Credential validation test', () => {
	it('The data must be correct', async () => {
		const isValid = await validationCreditCard.validate({
			name_card: 'visa',
			number: '4716434586315101',
			expiration: '09/26',
			balance: 100,
			cvv: '364',
		})
		expect(isValid).toBeTruthy()
	})
})
