require('dotenv').config()
const bcrypt = require('bcrypt');

const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
const validatePassword = async (userPassword: string, databasePassword: string) => {
    return await bcrypt.compare(userPassword, databasePassword)
};

export = { encryptPassword, validatePassword }