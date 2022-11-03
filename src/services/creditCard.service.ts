import client from '../database/conection'

const getCreditCard = async (idUser:number) => {
    try {
        const creditCard = await client.query(
            "SELECT * FROM creditcard WHERE id_user=$1;", 
            [idUser]
        )
        return creditCard.rows[0]
    } catch (error) {
        console.error(`Some wrong in getCreditCard service: ${error}`)
        throw error   
    }
}

const updateCreditCard = async (card: {nameCard?:string, expiration?:Date, balance?:number, cvv?:number, cardNumber?:string}, id:number) => {
    try {
        const creditCardUpdated = await client.query(
            "UPDATE creditcard SET name_card=$1, expiration=$2, balance=$3, cvv=$4, number=$5 WHERE id_user=$6",
            [card.nameCard, card.expiration, card.balance, card.cvv, card.cardNumber, id]
        )
        return creditCardUpdated
    } catch (error) {
        console.error(`Some wrong in updateCreditCard service: ${error}`)
        throw error
    }
}

const deleteCreditCard = async (id:number) => {
    try {
        const creditCardDeleted = await client.query(
            "DELETE FROM creditcard WHERE id_user=$1",
            [id]
        )
        return creditCardDeleted
    } catch (error) {
        console.error(`Some wrong in deleteCreditCard service: ${error}`)
        throw error
    }
}

export = {
    updateCreditCard,
    getCreditCard,
    deleteCreditCard
}