
import saleService from '../services/sale.service'

const sellTicket = (req:any, res:any) => {
    try {
        const data = saleService.postSale(req.body.idUser, req.body.idTicket)
        return data
    } catch (error) {
        throw error
    }
}

export = {
    sellTicket
}