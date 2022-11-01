import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const verifyToken = (req:Request, res:Response, next:NextFunction) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ error: 'Access Denied' })
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET as string)
        //req.user = verified
        next() 
    } catch (error) {
        res.status(400).json({error: 'Token is not valid'})
    }
}

export = verifyToken