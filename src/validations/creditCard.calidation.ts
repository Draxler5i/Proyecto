import { object, number, date, string } from "yup"

const schemaCreditCard = object({
    number:string()
        .required()
        .min(15,"The number must have at least 15 characters")
        .max(25, "The name must have a maximum of 25 characters"),
    expiration: date()
        .required(),
    balance: number()
        .required()
        .min(50, "insufficient balance"),
    cvv: number()
        .required()
  })

export = schemaCreditCard