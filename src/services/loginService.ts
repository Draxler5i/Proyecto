const express = require('express')
const jwt = require('jsonwebtoken')

const login = async (req: any, res: any) => {
    try {
        const { userName, password } = req.body
        if (!userName || !password) {
            throw res.status(400)
        }

        const token = jwt.sign({
            userName: req.body.userName,
            password: req.body.password,
        }, process.env.TOKEN_SECRETO)
        res.json({
            error: null,
            data: "Bienvenido"
        })
    } catch (error) {
        throw (error)
    }
}

export = {
    login,
}

