const jwt = require('jsonwebtoken')
const express = require('express')
const app = express()
const keys = require('../settings/keys')
app.set('key', keys.key)

const checkPayload = (req:any, res:any)=>{
    if(req.body.email == 'adam@email.com' && req.body.password == '12345'){
        const payload = {
            check: true
        }
        const token = jwt.sign(payload, app.get('key'),{
            expiresIn: '7d'
        })
        res.json({
            message: 'SUCCESFUL AUTHENTICATION',
            token: token
        })
    }else{
        res.json({
            message: 'INCORRECT USER OR PASSWORD, PLEASE TRY AGAIN'
        })
    }
}

export = {
    checkPayload
}