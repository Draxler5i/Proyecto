require('dotenv').config();
    
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.USER_DB,
    host: process.env.HOST_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE,
    port: process.env.PORT_DB
});   

module.exports = pool 
