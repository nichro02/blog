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
    const [upvoteCount, setUpvoteCount] = useState(0)
    const [downvoteCount, setDownvoteCount] = useState(0)
    const [original, setOriginal] = useState(null)
    const [IsRepost, setIsRepost] = useState(false)
    const [numberOfReposts, setNumberOfReposts] = useState(0)
    const [edit, setEdit] = useState(false)
    const [disableRepost, setDisableRepost] = useState(false)

    const currentUser=getCurrentUser()
    let postData = props.post
    console.log(postData)

    //useEffect to determine which buttons/actions are available to a user for each post
    useEffect(() => {
        setUpvoteCount(postData.upvote)
        setDownvoteCount(postData.downvote)
        setNumberOfReposts(postData.reposts)
        if(postData.isRepost===true){
            setIsRepost(true)
        }
    })

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
    const countUpvote = () => {
        setUpvoteCount(postData.upvote + 1)
        //console.log(upvoteCount)
        upvote(postData._id,postData.author[0]._id,upvoteCount)
        window.location.reload()
    }
    //increment downvote
    const countDownvote = () => {
        setDownvoteCount(postData.downvote + 1)
        downvote(postData._id,postData.author[0]._id,downvoteCount)
        window.location.reload()
    }
    //increment favorite
    //handle reply

    return(
        <div>
            {postData.title}
            {postData.body}
            {postData.upvote}
            {postData.downvote}
            {postData.author[0].username}
            {(currentUser && postData.author[0]._id === currentUser.id) && (
                <div>
                    <button onClick={editPost}>Edit</button>
                    
                </div>
            )}
            {(currentUser && (
                <div>
                    <button onClick={countUpvote}>Upvote</button>
                    <button onClick={countDownvote}>Downvote</button>
                </div>
            ))}
        </div>
    )
}

export default Post