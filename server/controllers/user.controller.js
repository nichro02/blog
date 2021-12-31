const User = require('../models/user.model')

//show user profile
exports.displayUserProfile = (req, res) => {
    //console.log(req.params)
    // res.send('This is the user profile')
    User.findById(req.params.id)
    .populate('posts')
    .exec((error, user) => {
        if(error){
            res.status(400).send({message: "Error retrieving profile"})
        }
        else {
            //console.log(user)
            res.send(user)
        }
    })
}

//user board
exports.userBoard = (req, res) => {
    res.status(200).send("User content")
}

//follow a user
exports.follow = (req, res) => {
    //push user to be followed by currentUser to currentUser's followed array
    User.findOne({'_id': req.body.currentUser}, async function(error, user){
        if(!user.followed.includes(req.body.otherUser)){
            await user.followed.push(req.body.otherUser)
            await user.save()
            console.log('USERS FOLLOWED ->',user.followed)
        }
    })
    //update followers array for user that is followed
    User.findOne({'_id': req.body.otherUser}, async function(error, user) {
        if(!user.followers.includes(req.body.currentUser)){
            await user.followers.push(req.body.currentUser)
            await user.save()
            console.log('FOLLOWERS ->', user.followers)
            res.send(user)
        }
    })
}

//unfollow user
exports.unfollow = (req, res) => {
    //remove unfollowed user from currentUser's followed array
    User.findOne({"_id": req.body.currentUser}, async function (error, user) {
        await user.followed.pull(req.body.otherUser)
        user.save((error) => {
            if (error) res.send(error)
        })
        console.log(user.followed)
    })
    //update followers array from user who has been unfollowed
    User.findOne({"_id": req.body.otherUser}, async function (err, user) {
        await user.followers.pull(req.body.currentUser)
        user.save((error) => {
            if (error) res.send(error)
        })
        console.log(user)
    })
    res.send("User succesfull unfollowed")
}