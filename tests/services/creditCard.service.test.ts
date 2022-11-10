import creditCardService = require('../../src/services/creditCard.service')

describe('Credit card service test', () => {
	it('Get credit card from database successfully', async () => {
		const creditCard = await creditCardService.getCreditCard(12)
		expect(creditCard).toEqual(
			expect.objectContaining({
				id_card: 23,
				id_user: 12,
			})
		)
	})

	it('Save the credit card to the database successfully', async () => {
		const creditCardSaved = await creditCardService.postCreditCard(
			{
				name_card: 'visa',
				expiration: '12/25',
				created: new Date(),
				balance: 300,
				cvv: 212,
				number: '4716434586315101',
			},
			12
		)
		expect(creditCardSaved).toEqual(
			expect.objectContaining({ command: 'INSERT' })
		)
	})

	it('Update the credit card in database successfully', async () => {
		const creditCardUpdated = await creditCardService.updateCreditCard(
			{
				name_card: 'visa',
				expiration: '12/25',
				balance: 500,
				cvv: 212,
				number: '4716434586315101',
			},
			12
		)
		expect(creditCardUpdated).toEqual(
			expect.objectContaining({ command: 'UPDATE' })
		)
	})

	it('Update credit card balance in database successfully', async () => {
		const balanceUpdated = await creditCardService.updateBalanceCreditCard(
			500,
			12
		)
		expect(balanceUpdated).toEqual(
			expect.objectContaining({ command: 'UPDATE' })
		)
	})

	it('Delete credit card from the database successfully', async () => {
		const creditCardDeleted = await creditCardService.deleteCreditCard(20)
		expect(creditCardDeleted).toEqual(
			expect.objectContaining({ command: 'COMMIT' })
		)
	})
})
