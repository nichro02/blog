const User = require('../models/user.model')

//show user profile
exports.displayUserProfile = (req, res) => {
    console.log(req.params)
    // res.send('This is the user profile')
    User.findById(req.params.id)
    .populate('posts')
    .exec((error, user) => {
        if(error){
            res.status(400).send({message: "Error retrieving profile"})
        }
        else {
            console.log(user)
            res.send(user)
        }
    })
}

//user board
exports.userBoard = (req, res) => {
    res.status(200).send("User content")
}

