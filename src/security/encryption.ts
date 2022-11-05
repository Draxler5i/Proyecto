require('dotenv').config()
//const bcrypt = require('bcrypt');
import bcrypt from 'bcrypt'

const encryptPassword = (password: string): String => {
    const SALT = 10;
    return bcrypt.hashSync(password, SALT);
};
const validatePassword = (userPassword: string, hashedStoredPassword: string): Boolean => {
    return bcrypt.compareSync(userPassword, hashedStoredPassword)
};

export = { encryptPassword, validatePassword }