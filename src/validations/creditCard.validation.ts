import { object, number, string } from 'yup'
import valid from 'card-validator'

const schemaCreditCard = object({
	nameCard: string().required('The card name is required'),
	number: string()
		.test(
			'test-number',
			'Credit Card number is invalid',
			(value) => valid.number(value).isValid
		)
		.required('The card number is required'),
	expiration: string()
		.test(
			'test-expiration',
			'Credit Card expiration is invalid',
			(value) => valid.expirationDate(value).isValid
		)
		.required('The card expiration is required'),
	balance: number().required().min(50, 'insufficient balance'),
	cvv: string()
		.test(
			'test-cvv',
			'Credit Card cvv is invalid',
			(value) => valid.cvv(value).isValid
		)
		.required('The card cvv is required'),
})

export = schemaCreditCard
