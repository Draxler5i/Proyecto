import userService from '../../src/services/user.service'

describe('User service test', () => {
	it('Get all users from database successfully', async () => {
		const users = await userService.getUsers()
		expect(users.length).toBeGreaterThan(0)
	})

	it('Get one user from database successfully', async () => {
		const user = await userService.getOneUser(1)
		expect(user[0]).toEqual(
			expect.objectContaining({
				name_user: 'Anahi',
				email: 'anahi1@admin.com',
			})
		)
	})

	it('Save the user to the database successfully', async () => {
		const userSaved = await userService.postUser(
			{
				name: 'Julio',
				age: 45,
				email: 'julio@gmail.com',
				password: 'passwordencrypted',
				birthday: new Date(),
				created: new Date(),
				lastname: 'Montes',
			},
			{
				name_card: 'visa',
				expiration: '25/25',
				created: new Date(),
				balance: 1000,
				cvv: 150,
				number: '4539250218584491',
			}
		)
		expect(userSaved).toEqual(
			expect.objectContaining({
				command: 'COMMIT',
			})
		)
	})

	it('Update user in database successfully', async () => {
		const userUpdated = await userService.updateUser({
			name: 'Julio2',
			age: 45,
			email: 'julio@gmail.com',
			password: 'passwordencrypted',
			birthday: new Date(),
			lastname: 'Montes',
			id: 16,
		})
		expect(userUpdated).toEqual(
			expect.objectContaining({ command: 'UPDATE' })
		)
	})

	it('Delete user from the database successfully', async () => {
		const userDeleted = await userService.deleteUser(17)
		expect(userDeleted).toEqual(
			expect.objectContaining({ command: 'COMMIT' })
		)
	})

	it('Get the number of tickets purchased by an user from the database successfully', async () => {
		const ticketsPurchased = await userService.getTicketsPurchased(1)
		expect(ticketsPurchased).toBe(0)
	})

	it('Verify the existence of an user in the database', async () => {
		const existUser = await userService.existUser('anahi1@admin.com')
		expect(existUser).toEqual(
			expect.arrayContaining([expect.objectContaining({ id_user: 1 })])
		)
	})

	it("Verify that an user doesn't exist in the database", async () => {
		const existUser = await userService.existUser('anahi@admin.com')
		expect(existUser).toBeNull()
	})
})
