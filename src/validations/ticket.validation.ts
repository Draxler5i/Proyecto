import { object, string, number, date } from "yup"

const schemaTicket = object({
    price: number()
      .required("The name is required"),
    currency: string()
        .required("The currency is required")
        .length(2, "The currency must have just 2 characters"),
    matchDay: date()
  })

export = schemaTicket