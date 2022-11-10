import validationTicket from '../../src/validations/ticket.validation'

describe('Ticket validation test', () => {
	it('The data must be correct', async () => {
		const isValid = await validationTicket.validate({
			price: 50,
			currency: 'Bs',
			idStadium: 1,
		})
		expect(isValid).toBeTruthy()
	})
})
