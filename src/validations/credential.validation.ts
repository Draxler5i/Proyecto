import { object, string } from 'yup'

const schemaCredential = object({
	email: string().required('The email is required'),
	password: string().required('The password is required'),
})

export = schemaCredential
