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
		.min(8, 'The password is too short - should be 8 chars minimum')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}[^'\s]/,
			'The password must be at least 8 characters, maximum 15, at least one uppercase letter, at' +
				'least one lowercase letter, at least one digit, no blank spaces, at least 1 special character'
		),
	birthday: date().max(
		new Date(Date.now() - 567648000000),
		'You must be at least 18 years'
	),
})

export = schemaUser
