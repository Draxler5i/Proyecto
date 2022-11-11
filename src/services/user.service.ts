const client = require(`../postgres/connection`)
const validate = require(`./validations/validationFunctions`)
const encrypt = require(`../security/encryption`)
const errors = require(`./errorMessages/errors`)

const getUsers = async (_req: Express.Request, res: Express.Response) => {
    try {
        const users = await client.query(`SELECT * from public.user`)
        return res.status(200).json(users.rows)
    } catch (e) {
        console.log(e)
        return res.status(400).send(errors.throw_error(errors.ERROR_GET('users')))
    }
}
const createUser = async (req: Express.Request, res: Express.Response) => {
    const { name, last_name, email, password, age, nit, card_number,
        card_name, expiration, cvv, saldo } = req.body
    const USER_ERROR = errors.ERROR_MESSAGE('CREATE a user and card')
    if (!name || !last_name || !email || !password || !age || !nit || !card_number ||
        !card_name || !expiration || !cvv || !saldo) {
        return res.status(400).send(errors.ERROR_VARIABLE)
    }
    if (!validate.validateEmail(email)) {
        return res.status(400).send(`Not valid email.`)
    }
    if (age < 18) {
        return res.status(400).send(`Age not valid, must be greater than 18. 
        We do not allow minors to make purchases, as one of our intern politics.`)
    }
    if (!validate.validatePass(password)) {
        return res.status(400).send(`Password must be at least of 6 characters 
        and maximum 12 characters. Password must contain at least: a number, 
        an uppercase letter, a lowercase letter, a digit, a special character 
        and NO blanck spaces`)
    }
    try {
        //await client.query(`BEGIN`)
        const password_encrypted = encrypt.encryptPassword(password)
        const user = await client.query(`INSERT INTO public.user(name, last_name, email, password, age, nit) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, last_name, email, password_encrypted, age, nit])
        const card = client.query(`INSERT INTO creditCard(card_number, card_name, expiration, cvv, user_id, saldo) 
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [card_number, card_name, expiration, cvv, user.rows[0].user_id, saldo])
        return res.status(201).send(`User added with user name: ${user.rows[0].name}, lastname: ${user.rows[0].last_name}, email: ${user.rows[0].email}, age: ${user.rows[0].age}, nit: ${user.rows[0].nit}, card name: ${card.rows[0].card_name}, expiration: ${card.rows[0].expiration}`)
        //return await client.query(`COMMIT`)
    } catch (e) {
        //await client.query(`ROLLBACK`)
        console.log(e)
        return res.status(400).send(errors.throw_error(USER_ERROR))
    }
}
const updateUser = async (req: Express.Request, res: Express.Response) => {
    const id = parseInt(req.params.id)
    const UPDATE_USER_ERROR = errors.ERROR_MESSAGE('UPDATE the user and card')
    const { email, password, nit, card_number, card_name, expiration, cvv, saldo } = req.body
    if (!email || !password || !nit || !card_number ||
        !card_name || !expiration || !cvv || !saldo) {
        return res.status(400).send(errors.ERROR_VARIABLE)
    }
    if (!validate.validateEmail(email)) {
        return res.status(400).send(`Not valid email.`)
    }
    if (!validate.validatePass(password)) {
        return res.status(400).send(`Password must be at least of 6 characters 
        and maximum 12 characters. Password must contain at least: a number, 
        an uppercase letter, a lowercase letter, a digit, a special character 
        and NO blanck spaces`)
    }
    try {
        //await client.query(`BEGIN`)
        const user_exists = await client.query(`select * from public.user where user_id = $1`, [id])
        if (user_exists.rowCount == 0) {
            return res.status(400).send(UPDATE_USER_ERROR)
        }
        const new_password_encrypted = encrypt.encryptPassword(password)
        await client.query(`UPDATE public.user SET email = $1, password = $2, nit=$3 
                WHERE user_id = $4`, [email, new_password_encrypted, nit, id])
        await client.query(`UPDATE public.creditcard SET card_number = $1, 
                card_name = $2, expiration = $3, cvv=$4, saldo =$5 WHERE user_id = $6`,
            [card_number, card_name, expiration, cvv, saldo, id])
        return res.status(200).send(`User modified with email: ${email}`)
        //return await client.query(`COMMIT;`)
    } catch (e) {
        //await client.query(`ROLLBACK;`)
        console.log(e)
        return res.status(400).send(errors.throw_error(UPDATE_USER_ERROR))
    }
}
const deleteUser = async (req: Express.Request, res: Express.Response) => {
    const id = parseInt(req.params.id)
    const DELETE_ERROR = errors.ERROR_MESSAGE('DELETE user')
    try {
        //await client.query(`BEGIN`)
        const user_exists = await client.query(`select * from public.user where user_id = $1`,
            [id])
        if (user_exists.rowCount == 0) {
            return res.status(400).send(DELETE_ERROR)
        }
        await client.query(`DELETE FROM public.creditCard WHERE user_id = $1`, [id])
        await client.query(`DELETE FROM public.user WHERE user_id = $1`, [id])
        return res.status(200).send(`User and user's cards deleted with ID: ${id}`)
        //return await client.query(`COMMIT;`)
    } catch (e) {
        //await client.query(`ROLLBACK;`)
        console.log(e)
        return res.status(400).send(errors.throw_error(DELETE_ERROR))
    }
}

export = {
    getUsers, createUser, updateUser, deleteUser
}