const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const db = require('../models/index')

const User = db.user

//verify web token
verifyWebToken = (req, res, next) => {
    //declare token which is passed in through headers
    let token = req.headers['x-axcess-token']

    //error out if no token
    if(!token){
        return res.status(403).send({message:'There is an error with the token'})
    }

    //verify token
    jwt.verify(token, config.secret, (error, decoded) => {
        if(error){
            return res.status(401).send({message: 'Unauthorized user'})
        }
        
        //set userId to decoded id
        req.userId = decoded.id
        next()
    })
}

const authJwt = {
    verifyWebToken
}

module.exports = authJwt