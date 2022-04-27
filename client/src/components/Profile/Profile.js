import { useState, useEffect } from 'react'
import { getCurrentUser } from '../../services/auth.service'
import { userProfile } from '../../services/user.service'
import { useParams } from 'react-router'
import Post from '../Post/Post'

import { Box } from '@material-ui/core'

const Profile = (props) => {
    const [userData, setUserData] = useState(null)
    const [postFeed, setPostFeed] = useState([])
    const { id } = useParams()
    let feed
    console.log(id)
    //const currentUser=getCurrentUser()

    //retrieve user info
    async function getUserProfile() {
        await userProfile(id)
        .then(response => {
            console.log(response)
            setUserData(response.data)
            setPostFeed(response.data.posts)    
        })
        // .then(() => {
        //     feed = userData.posts.reverse().map((post, index) => {
        //         return <Post key={post._id} post={post}/>
        //     })
        // }
            
        //)
        console.log(userData)
        console.log(postFeed)
    }

    useEffect(() => {
        getUserProfile()
        
    }, [])

    
                // <h1>{userData.username}</h1>
                // <h3>Total posts: {userData.posts.length}</h3>
                // <h3>Upvotes received: {userData.upvote}</h3>
    
    

    return(
            
        <div>
                <h1>{userData.username}</h1>
                <h3>Total posts: {userData.posts.length}</h3>
                <h3>Upvotes received: {userData.upvote}</h3>
                <h3>Downvotes received: {userData.downvote}</h3>
                
            </div>    
            
        
        
    )
}

export default Profile