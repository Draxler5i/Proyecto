import userService from '../services/user.service'
import encryptor from '../security/encryp'
import validateUser from '../validations/user.validation'
import validateCard from '../validations/creditCard.validation'
import validateCredential from '../validations/credential.validation'
import jwt from 'jsonwebtoken'

const register = async (req: any, res: any) => {
	const { password, birthday } = req.body.user
	try {
		req.body.user.birthday = new Date(birthday)
		await validateUser.validate(req.body.user)
		await validateCard.validate(req.body.card)
		const user = await userService.existUser(req.body.email)
		if (user) {
			return res.status(400).send({
				status: 'FAILED',
				data: {
					error: 'There is already a registered user with this email address ',
				},
			})
		}
		const passwordEncrypted = await encryptor.encrypt(password)
		req.body.user.password = passwordEncrypted
		req.body.user.birthday = new Date(birthday)
		req.body.user.created = req.body.card.created = new Date(Date.now())
		const userPosted = await userService.postUser(
			req.body.user,
			req.body.card
		)
		res.status(201).send({
			status: 'OK',
			data: userPosted,
			message: 'User created',
		})
	} catch (error) {
		console.error(`Some wrong in register controller: ${error}`)
		res.send({ status: 'FAILED', data: { error } })
	}
}

const login = async (req: any, res: any) => {
	try {
		await validateCredential.validate(req.body)
		const user = await userService.existUser(req.body.email)
		if (!user) {
			return res.status(400).send({
				status: 'FAILED',
				data: { error: "The user doesn't exist" },
			})
		}
		const validpwd = await encryptor.compare(
			req.body.password,
			user[0].password
		)
		if (!validpwd) {
			return res.status(400).send({
				status: 'FAILED',
				data: { error: 'The password is incorrect' },
			})
		}
		const token = jwt.sign(
			{
				id: user[0].id_user,
				email: user[0].email,
			},
			process.env.TOKEN_SECRET as string
		)
		return res.json({ token, data: 'Welcome' })
	} catch (error) {
		console.error(`Some wrong in login controller: ${error}`)
		res.send({ status: 'FAILED', data: { error } })
	}
}

export = {
	login,
	register,
}
