const pool = require('../database/connection')

const getCreditCard = async (idUser: number) => {
    try {
        return await pool.query('SELECT * FROM creditcard WHERE id_user=?', idUser)
    } catch (error) {
        console.log(`something go wrong get creditCard ${error}`);
        throw (error)
    }
}

const postCreditCard = async (
    card:
        {
            credit_name: string,
            credit_number: number,
            cvv: number
            expiration_date: Date,
            balance: number
        },
    idUser: number) => {
    try {
        const postCreditCard = await pool.query(
            'INSERT INTO creditcard (credit_name, credit_number, cvv, expiration_date,balance, id_user ) values(?,?,?,?,?,?)',
            [
                card.credit_name,
                card.credit_number,
                card.cvv,
                card.expiration_date,
                card.balance,
                idUser
            ]
        )
        return postCreditCard
    } catch (error) {
        console.log(`something go wrong post creditCard ${error}`);
        throw (error)
    }
}

const saveBalance = async (balance: number, idUser: number) => {
    try {
        const updateBalance = await pool.query('UPDATE creditCard SET balance=? WHERE id_user=?',
            [
                balance,
                idUser
            ]
        )
        return updateBalance
    } catch (error) {
        console.log(`Something go wrong put balance creditCard service ${error}`);
        throw (error)
    }

}

const putCrediCard = async (
    creditCard:
        {
            credit_name?: string,
            credit_number?: number,
            cvv?: number
            expiration_date?: Date,
            balance?: number
        }, id: number) => {
    try {
        const updateCreditCard = await pool.query(
            'UPDATE creditCard SET credit_name=?, credit_number=?, cvv=?, expiration_date=?, balance=? WHERE id_credit = ?',
            [
                creditCard.credit_name,
                creditCard.credit_number,
                creditCard.cvv,
                creditCard.expiration_date,
                creditCard.balance,
                id
            ]
        )
        return updateCreditCard
    } catch (error) {
        console.log(`Something go wrong update creditCard service ${error}`);
        throw (error)
    }
}

const deleteCreditCard = async (id: number) => {
    try {
        return await pool.query('DELETE FROM creditcard WHERE id_credit =?', id)
    } catch (error) {
        console.log(`Something go wrong delete creditCard service ${error}`);
        throw (error)
    }
}

export = {
    getCreditCard,
    postCreditCard,
    deleteCreditCard,
    putCrediCard,
    saveBalance
}