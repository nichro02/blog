import { useState, useEffect } from 'react'
import { getCurrentUser } from '../../services/auth.service'
import EditPost from '../EditPost/EditPost'
import {
    deletePost,
    upvote,
    downvote,
    repost,
    favoritePost,
    reply
} from '../../services/post.service'

const Post = props => {
    //manage state
    const [exists, setExist] = useState(true)
    const [favorite, setFavorite] = useState(false)
    const [numberOfFavorites, setNumberOfFavorites] = useState(0)
    const [upvote, setUpvote] = useState(0)
    const [downvote, setDownvote] = useState(0)
    const [original, setOriginal] = useState(null)
    const [IsRepost, setIsRepost] = useState(false)
    const [numberOfReposts, setNumberOfReposts] = useState(0)
    const [edit, setEdit] = useState(false)
    const [disableRepost, setDisableRepost] = useState(false)

    const currentUser=getCurrentUser()
    let postData = props.post
    console.log(postData)

    //actions on post
    const editPost = () => {
        setEdit(true)
        setExist(false)
    }
    const deleteThisPost = () => {
        deletePost(postData._id)
        setExist(false)
    }
    const makeRepost = async () => {
        const flagRepost = setIsRepost(true)
        await repost(postData.title, postData.body, postData.originalAuthor, postData._id, currentUser.id, flagRepost)
        setNumberOfReposts(numberOfReposts + 1)
        setDisableRepost(true)
    }

    //increment upvote
    //increment downvote
    //increment favorite
    //handle reply

    return(
        <div>
            Post goes here
        </div>
    )
}

export default Post