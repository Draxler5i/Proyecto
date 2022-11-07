import { object, string, number } from 'yup'

const schemaTicket = object({
	price: number().required('The price is required'),
	currency: string().required('The currency is required'),
	idStadium: number().required('The stadium id is required'),
})

export = schemaTicket
