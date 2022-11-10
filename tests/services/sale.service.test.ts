import saleService = require('../../src/services/sale.service')

describe('Sale ticket service test', () => {
	it('Successfully complete the ticket sale transaction', async () => {
		const sale = await saleService.postSale(5, 2)
		expect(sale).toEqual(expect.objectContaining({ command: 'COMMIT' }))
	})

	it('Perform the ticket refund transaction successfully', async () => {
		const refund = await saleService.postRefund(5, 1)
		expect(refund).toEqual(expect.objectContaining({ command: 'COMMIT' }))
	})
})
