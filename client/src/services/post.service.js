import axios from 'axios'

const API_URL = 'http://localhost:4000/api/post/'

//get all posts
export const allPosts = () => {
    return axios.get(API_URL + 'all')
}

//get single post
export const onePost = (idx) => {
    return axios.get(API_URL + idx)
}

//create new post
export const newPost = (
    title,
    body,
    tags,
    author
) => {
    return axios.post(API_URL + 'new', {
        title,
        body,
        tags,
        author
    })
}

//edit post
export const editPost = (
    id,
    body
) => {
    return axios.put(API_URL + 'edit', {
        id,
        body
    })
}

//delete post
export const deletePost = (_id) => {
    return axios.delete(API_URL + 'delete', {
        data: {
            _id: _id
        }
    })
}

//upvote post
export const upvote = (
    id,
    authorId,
    upvote
) => {
    return axios.put(API_URL + 'upvote', {
        id,
        authorId,
        upvote
    })
}

//downvote post
export const downvote = (
    id,
    authorId,
    downvote
) => {
    return axios.put(API_URL + 'downvote', {
        id,
        authorId,
        downvote
    })
}

//repost a post
export const repost = (
    title,
    body,
    originalAuthor,
    originalPost,
    userId,
    isRepost
) => {
    return axios.put(API_URL + 'repost', {
        title,
        body,
        originalAuthor,
        originalPost,
        userId,
        isRepost
    })
}

//favorite a post
export const favoritePost = (
    id,
    userId
) => {
    return axios.put(API_URL + 'favorite', {
        id,
        userId
    })
}

//reply to a post
export const reply = (
    title,
    body,
    tags,
    originalAuthor,
    originalPost
) => {
    return axios.put(API_URL + 'reply', {
        title,
        body,
        tags,
        originalAuthor,
        originalPost
    })
}