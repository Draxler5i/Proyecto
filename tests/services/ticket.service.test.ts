import ticketService = require('../../src/services/ticket.service')

describe('Ticket service test', () => {
	it('Get all tickets from database successfully', async () => {
		const tickets = await ticketService.getTickets()
		expect(tickets.length).toBeGreaterThan(0)
	})

	it('Get one ticket from database successfully', async () => {
		const ticket = await ticketService.getOneTicket(1)
		expect(ticket[0]).toEqual(
			expect.objectContaining({
				id_ticket: 1,
				id_stadium: 1,
			})
		)
	})

	it('Save the ticket to the database successfully', async () => {
		const ticketSaved = await ticketService.postTicket({
			price: 50,
			currency: 'Bs',
			matchDay: new Date(),
			created: new Date(),
			state: false,
			idStadium: 1,
		})
		expect(ticketSaved).toEqual(
			expect.objectContaining({
				command: 'INSERT',
			})
		)
	})

	it('Update ticket in database successfully', async () => {
		const ticketUpdated = await ticketService.updateTicket({
			id: 5,
			currency: 'Bs',
			idStadium: 1,
			matchDay: new Date(),
			price: 100,
			state: false,
		})
		expect(ticketUpdated).toEqual(
			expect.objectContaining({
				command: 'UPDATE',
			})
		)
	})

	it('Update ticket state in database successfully', async () => {
		const ticketStateUpdated = await ticketService.updateTicketState({
			id: 5,
			state: true,
		})
		expect(ticketStateUpdated).toEqual(
			expect.objectContaining({ command: 'UPDATE' })
		)
	})

	it('Delete ticket from the database successfully', async () => {
		const ticketDeleted = await ticketService.deleteTicket(5)
		expect(ticketDeleted).toEqual(
			expect.objectContaining({ command: 'DELETE' })
		)
	})

	it('Get the number of tickets available for sale from the database successfully', async () => {
		const ticketAvailables = await ticketService.getTicketsAvailable()
		expect(ticketAvailables).toBe(2)
	})
})
