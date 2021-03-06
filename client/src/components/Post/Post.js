import { useState, useEffect } from 'react'
import { getCurrentUser } from '../../services/auth.service'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import EditPost from '../EditPost/EditPost'
import {
    deletePost,
    upvote,
    downvote,
    repost,
    favoritePost,
    reply
} from '../../services/post.service'

import {Button} from '@material-ui/core'
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles'
import { green, purple } from '@material-ui/core/colors'

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
    const [params, setParams] = useState(null)
    const [hideDownvote, setHideDownvote] = useState(false)
    const [hideUpvote, setHideUpvote] = useState(false)

    const currentUser=getCurrentUser()
    let postData = props.post
    console.log(postData)
    let navigate = useNavigate()
    let location = useLocation()
    //useEffect to determine which buttons/actions are available to a user for each post
    useEffect(() => {
        setUpvoteCount(postData.upvote)
        setDownvoteCount(postData.downvote)
        setNumberOfReposts(postData.reposts)
        if(postData.isRepost===true){
            setIsRepost(true)
        }
        if(currentUser.downvotePosts.indexOf(postData._id) !== -1){
            setHideDownvote(true)
        }
        if(currentUser.upvotePosts.indexOf(postData._id) !== -1){
            setHideUpvote(true)
        }
        //console.log(currentUser)
    }, [])

    //actions on post
    const editPost = () => {
        setEdit(true)
        setExist(false)
    }
    const deleteThisPost = () => {
        deletePost(postData._id)
        setExist(false)
        navigate('/')
        window.location.reload()
        console.log('DELETED POST: ', postData._id)
    }
    const makeRepost = async () => {
        //const flagRepost = setIsRepost(true)
        await repost(postData.title, postData.body, postData.tags, postData.originalAuthor, postData._id, currentUser.id)
        setNumberOfReposts(numberOfReposts + 1)
        setDisableRepost(true)
        window.location.reload()
    }

    //increment upvote
    const countUpvote = () => {
        setUpvoteCount(postData.upvote + 1)
        console.log(currentUser.id)
        upvote(postData._id,postData.author[0]._id,upvoteCount,currentUser.id)
        //window.location.reload()
    }
    //increment downvote
    const countDownvote = () => {
        setDownvoteCount(postData.downvote + 1)
        downvote(postData._id,postData.author[0]._id,downvoteCount,currentUser.id)
        setHideDownvote(true)
        //window.location.reload()
    }
    //increment favorite
    const handleFavorite = () => {
        setNumberOfFavorites(postData.favorites + 1)
        favoritePost(postData._id,currentUser.id,numberOfFavorites)
        window.location.reload()
    }
    //handle reply
    const handleReply = () => {
        console.log('REPLY')
    }

    //create color buttons for green(favorite), etc buttons
    const GreenButton = withStyles((theme) => ({
        root: {
          color: theme.palette.getContrastText(green[500]),
          backgroundColor: green[500],
          '&:hover': {
            backgroundColor: green[700],
          },
        },
      }))(Button)

      const PurpleButton = withStyles((theme) => ({
        root: {
          color: theme.palette.getContrastText(purple[500]),
          backgroundColor: purple[500],
          '&:hover': {
            backgroundColor: purple[700],
          },
        },
      }))(Button)

    return(
        <div>
            {postData.title}
            {postData.body}
            {postData.upvote}
            {postData.downvote}
            <Link to={`/profile/${postData.author[0]._id}`}>
                {postData.author[0].username}
            </Link>
            {(currentUser && postData.author[0]._id === currentUser.id) && (
                <div>
                    <Button variant="contained"color='primary' onClick={editPost}>
                        <Link to={`/post/edit/${postData._id}`} state={{from: postData}} style={{ textDecoration: 'none', color: 'white'}}>
                        Edit
                        </Link>
                    </Button>
                    <Button variant="contained" color="secondary" onClick={deleteThisPost}>Delete</Button>
                </div>
            )}
            {(currentUser && (
                <div>
            
                    <GreenButton variant="contained" color='primary' onClick={handleFavorite}>Favorite</GreenButton>
                    
                    <PurpleButton>
                        <Link to={`/post/${postData._id}`} state={{from: postData}} style={{ textDecoration: 'none', color: 'white'}}>
                        Reply
                        </Link>
                    </PurpleButton>
                    
                    
                </div>
            ))}
            {(currentUser && (currentUser.upvotePosts.indexOf(postData._id) === -1 ||!hideUpvote)) && (
                <div>
                    <button onClick={countUpvote}>Upvote</button>
                </div>
            )}
            {(currentUser && (currentUser.downvotePosts.indexOf(postData._id) === -1 ||!hideDownvote)) && (
                <div>
                    <button onClick={countDownvote}>Downvote</button>
                </div>
            )}
            {(currentUser && postData.userReposts.indexOf(currentUser.id) === -1) && (
                <button onClick={makeRepost}>Repost</button>
            )}
        </div>
    )
}

export default Post