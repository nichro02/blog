const config = require('../config/auth.config')
const db = require('../models/index')

//access user
const User = db.user

//Encode and decode the jwt
const jwt = require('jsonwebtoken')
//hash password
const bcrypt = require('bcrypt')

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
            console.log(user)
        }
    })
}

//sign in existing user
exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username
    })
    .exec((error, user) => {
        if(error) {
            rest.status(500).send({message: error})
            return
        }
        //check user exists
        if(!user){
            return res.status(404).send({message: 'User not found'})
        }
        //validate the password by passing the req.body password and the password returned from db
        //over to bcrypt to unhash and compare
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password //encrypted password saved in db
        )
        //if password is not valid, return invalid password error
        if(!passwordIsValid){
            return res.status(401).send({accessToken: null, message: "invalid password"})
        }
        //if password is valid, generate a new token
        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 86400 //expires token in 24 hours
        })

        //send response back
        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token,
            upvotePosts: user.upvotePosts,
            downvotePosts: user.downvotePosts
        })
    })
}