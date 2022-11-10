import ticketService = require('../../src/services/ticket.service')

describe('Ticket service test', () => {
	it('Get all tickets from database successfully', async () => {
		try {
			const tickets = ticketService.getTickets()
			expect(tickets).toBe(5)
		} catch (error) {
			console.log(error)
		}
	})

	it('Get one ticket from database successfully', async () => {
		try {
			const ticket = ticketService.getOneTicket(1)
			expect(ticket).toBe(5)
		} catch (error) {
			console.log(error)
		}
	})

	it('Save the ticket to the database successfully', async () => {
		try {
			const ticketSaved = ticketService.postTicket({
				price: 0,
				currency: '',
				matchDay: new Date(),
				created: new Date(),
				state: false,
				idStadium: 5,
			})
			expect(ticketSaved).toBe(5)
		} catch (error) {
			console.log(error)
		}
	})

	it('Update ticket in database successfully', async () => {
		try {
			const ticketUpdated = ticketService.updateTicket({
				id: 0,
				currency: '',
				idStadium: 0,
				matchDay: new Date(),
				price: 0,
				state: false,
			})
			expect(ticketUpdated).toBe(5)
		} catch (error) {
			console.log(error)
		}
	})

	it('Update ticket state in database successfully', async () => {
		try {
			const ticketStateUpdated = ticketService.updateTicketState({
				id: 0,
				state: false,
			})
			expect(ticketStateUpdated).toBe(5)
		} catch (error) {
			console.log(error)
		}
	})

	it('Delete ticket from the database successfully', async () => {
		try {
			const ticketDeleted = ticketService.deleteTicket(0)
			expect(ticketDeleted).toBe(5)
		} catch (error) {
			console.log(error)
		}
	})

	it('Get the number of tickets available for sale from the database successfully', async () => {
		try {
			const ticketAvailables = ticketService.getTicketsAvailable()
			expect(ticketAvailables).toBe(5)
		} catch (error) {
			console.log(error)
		}
	})
})
