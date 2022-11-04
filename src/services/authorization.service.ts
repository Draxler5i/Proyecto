import Express from 'express'
import jwt from 'jsonwebtoken'

const {JWT_KEY}:any = process.env

const authorization:any = async (req:Express.Request, res:Express.Response, next:Express.NextFunction) =>{
    const authorization = req.get('authorization')
    let token:any = null
    if (authorization && authorization.toLowerCase().startsWith('bearer')){
        token = authorization.substring(7)
    }
    try{
        await jwt.verify(token, JWT_KEY)
        next()
    }
    catch (error){
        return res.status(401).send({
            status: "FAILED",
            data:{
                error: error
            }
        })
    }
} // if(!token || !decodedToken.id){

export {
    authorization
}