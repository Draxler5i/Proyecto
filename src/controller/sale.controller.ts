import saleService from '../services/sale.service'
import userService from '../services/user.service'
import validateCreditCard from '../validations/creditCard.calidation'

const sellTicket = async (req:any, res:any) => {
    const { idUser, idTicket } = req.body
    if(!idUser || !idTicket){
        res.status(400).send({
            status: "FAILED",
            data:{
                error: "Some attributes are missing or are empty"
            }
        })
    }
    try {
        const creditCard = await userService.getCreditCard(idUser)
        await validateCreditCard.validate(creditCard)
        const data = await saleService.postSale(req.body.idUser, req.body.idTicket)
        res.status(201).send({status: "OK", data:data?.command, message:`Ticket sold`})
    } catch (error) {
        res.status(400).send({
            status: "FAILED",
            data: { error }
        })
    }
}

export = {
    sellTicket
}