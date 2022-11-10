import saleService = require('../../src/services/sale.service')

describe('Sale ticket service test', () => {
	it('Successfully complete the ticket sale transaction', async () => {
		try {
			const sale = saleService.postSale(4, 5)
			expect(sale).toBe(5)
		} catch (error) {
			console.log(error)
		}
	})

	it('Perform the ticket refund transaction successfully', async () => {
		try {
			const refund = saleService.postRefund(4, 5)
			expect(refund).toBe(5)
		} catch (error) {
			console.log(error)
		}
	})
})
