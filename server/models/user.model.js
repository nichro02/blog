//require mongoose
const mongoose = require('mongoose')

//define User, including fields that are part of model

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        followed: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        favoritePosts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
        reposts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
        posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
        upvote: {
            type: Number,
            default: 0,
        },
        downvote: {
            type: Number,
            default: 0,
        },
        location: String,
        locationId: String,
        birthday: Date,
        dateRegistered: Date,
    })
)

module.exports = User