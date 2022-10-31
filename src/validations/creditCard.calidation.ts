import { object, string, number, date } from "yup"

const schemaCreditCard = object({
    expiration: date()
        .required(),
    balance: number()
        .required(),
    cvv: number()
        .required()
  })

export = schemaCreditCard