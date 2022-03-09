//require mongoose
const mongoose = require('mongoose')

//define Post, including fields that are part of model
const Post = mongoose.model(
    'Post',
    new mongoose.Schema({
        title: String,
        body: String,
        tags: [String],
        fileUpload: String,
        upvote: {
            type: Number,
            default: 0,
        },
        downvote: {
            type: Number,
            default: 0,
        },
        reposts: {
            type: Number,
            default: 0,
        },
        author: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        isRepost: {
            type: Boolean,
            default: false
        },
        isReply: {
            type: Boolean,
            default: false
        },
        replies: {
            type: Number,
            default: 0,
        },
        favorites: {
            type: Number,
            default: 0,
        },
        originalPost: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
        originalAuthor: String,
        userReposts:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    })
)

module.exports = Post