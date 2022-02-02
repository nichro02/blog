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

//upvote post

//downvote post

//repost a post