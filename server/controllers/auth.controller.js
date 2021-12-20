const config = require('../config/auth.config')
const db = require('../models/index')

//access user
const User = db.user

//Encode and decode the jwt
const jwt = require('jsonwebtoken')
//hash password
const bcrypt = require('bcryptjs')

//register new user
exports.signup = (req, res) => {
    //create user
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })

    //check for errors saving user
    user.save((error) => {
        if(error){
            res.status(500).send({message: error})
            return
        } else {
            res.send({message: 'User successfully created'})
        }
    })
}

//sign in existing user