import creditCardService from "./creditCard.service";


const pool = require('../database/connection')

const postSell = async (idUser: number, idTickets: number) => {
    try {
        await pool.query('INSERT INTO ticket id_user=?', idUser)
        const ticketPrice = await pool.query('SELECT price FROM tickets WHERE id_tickets=?', idTickets)
        const creditCard = await creditCardService.getCreditCard(idUser)
        const debit = creditCard.balance - ticketPrice
        await creditCardService.saveBalance(debit, idUser)
    } catch (error) {
        console.error(`Something go wrong with the sale service: ${error}`)
        throw error
    }
}

export ={
    postSell,
}