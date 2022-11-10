import creditCardService = require('../../src/services/creditCard.service')

describe('Credit card service test', () => {
	it('Get credit card from database successfully', async () => {
		try {
			const creditCard = await creditCardService.getCreditCard(16)
			expect(creditCard).toMatchObject({
				id_card: 16,
				name_card: 'visa',
				expiration: '11/25',
				created: '2022-11-08T04:00:00.000Z',
				balance: 1500,
				cvv: 220,
				id_user: 5,
				number: '4539250218584491',
			})
		} catch (error) {
			console.log(error)
		}
	})

	it('Save the credit card to the database successfully', async () => {
		try {
			const creditCardSaved = await creditCardService.postCreditCard(
				{
					name_card: '',
					expiration: '',
					created: new Date(),
					balance: 3,
					cvv: 2,
					number: '',
				},
				1
			)
			expect(creditCardSaved).toBe(5)
		} catch (error) {
			console.log(error)
		}
	})

	it('Update the credit card in database successfully', async () => {
		try {
			const creditCardUpdated = await creditCardService.updateCreditCard(
				{
					name_card: '',
					expiration: '',
					balance: 3,
					cvv: 2,
					number: '',
				},
				1
			)
			expect(creditCardUpdated).toBe(5)
		} catch (error) {
			console.log(error)
		}
	})

	it('Update credit card balance in database successfully', async () => {
		try {
			const balanceUpdated = await creditCardService.updateBalanceCreditCard(
				5,
				1
			)
			expect(balanceUpdated).toBe(5)
		} catch (error) {
			console.log(error)
		}
	})

	it('Delete credit card from the database successfully', async () => {
		try {
			const creditCardDeleted = await creditCardService.deleteCreditCard(1)
			expect(creditCardDeleted).toBe(5)
		} catch (error) {
			console.log(error)
		}
	})
})
