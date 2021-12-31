const User = require('../models/user.model')

//show user profile
exports.displayUserProfile = (req, res) => {
    User.findById(req.params.id)
    .populate('posts')
}

//user board
exports.userBoard = (req, res) => {
    res.status(200).send("User content")
}

