import { object, string, number, date } from 'yup'

const schemaUser = object({
	name: string()
		.required('The name is required')
		.min(3, 'The name must have at least 3 characters')
		.max(25, 'The name must have a maximum of 25 characters'),
	lastname: string()
		.required('The lastname is required')
		.min(5, 'The lastname must have at least 3 characters')
		.max(30, 'The lastname must have a maximum of 30 characters'),
	age: number()
		.required('The age is required')
		.positive('The age must be a positive number')
		.max(90, 'The age must not be grater than 90'),
	email: string()
		.required('The email is required')
		.email('The email is invalid'),
	password: string()
		.required('The password is required')
		.min(5, 'The password must have at least 5 characters')
		.max(20, 'The password must have a maximum of 20 characteres'),
	birthday: date(),
})

export = schemaUser
