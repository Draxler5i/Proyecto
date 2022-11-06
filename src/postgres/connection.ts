require('dotenv').config()
//const { Client } = require('pg')
const { Pool } = require('pg')
//const pool = new Pool()
const client = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    //port: process.env.DB_PORT
})
export = client