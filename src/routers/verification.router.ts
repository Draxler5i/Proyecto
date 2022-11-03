import Router from 'express'
import express from 'express'
const jwt = require('jsonwebtoken')
const router = Router()
import dotenv from 'dotenv'
dotenv.config()

const {JWT_KEY} = process.env

const verification = express.Router()
verification.use((req:any, res:any, next:any) => {
    let token = req.headers['authorization']
    console.log(token)
    if(!token){
        res.status(401).send({
            error: 'An authentication token is needed'
        })
        return
    }
    if(token.startsWith('Bearer ')){
        token = token.slice(7, token.length)
        console.log(token)
    }
    if(token){
        jwt.verify(token, JWT_KEY, (error:Error, decoded:any)=>{
            if(error){
                return res.json({
                    message: 'Token not valid'
                })
            }else{
                req.decoded = decoded
                next()
            }
        })
    }
})

router
    .get('/', verification, (req, res)=>{
        res.json('ACCESS TO INFORMATION ALLOWED')
    })

export = router