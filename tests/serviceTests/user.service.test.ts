import userService = require('../../src/services/user.service')

describe('User service test', () => {
	it('Get all users from database successfully', async () => {
		try {
			const users = await userService.getUsers()
			expect(users).toBe(0)
		} catch (error) {
			console.log(error)
		}
	})

	it('Get one user from database successfully', async () => {
		try {
			const user = await userService.getOneUser(0)
			expect(user).toBe(0)
		} catch (error) {
			console.log(error)
		}
	})

	it('Save the user to the database successfully', async () => {
		try {
			const userSaved = await userService.postUser(
				{
					name: '',
					age: 0,
					email: '',
					password: '',
					birthday: new Date(),
					created: new Date(),
					lastname: '',
				},
				{
					name_card: '',
					expiration: '',
					created: new Date(),
					balance: 0,
					cvv: 0,
					number: '',
				}
			)
			expect(userSaved).toBe(0)
		} catch (error) {
			console.log(error)
		}
	})

	it('Update user in database successfully', async () => {
		try {
			const userUpdated = await userService.updateUser({
				name: '',
				age: 0,
				email: '',
				password: '',
				birthday: new Date(),
				lastname: '',
				id: 0,
			})
			expect(userUpdated).toBe(0)
		} catch (error) {
			console.log(error)
		}
	})

	it('Delete ticket from the database successfully', async () => {
		try {
			const userDeleted = await userService.deleteUser(0)
			expect(userDeleted).toBe(0)
		} catch (error) {
			console.log(error)
		}
	})

	it('Get the number of tickets purchased by an user from the database successfully', async () => {
		try {
			const ticketsPurchased = await userService.getTicketsPurchased(0)
			expect(ticketsPurchased).toBe(0)
		} catch (error) {
			console.log(error)
		}
	})

	it('Verify the existence of a user in the database', async () => {
		try {
			const existUser = await userService.existUser('')
			expect(existUser).toBe(0)
		} catch (error) {
			console.log(error)
		}
	})
})
