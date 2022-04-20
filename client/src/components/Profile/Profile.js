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
        console.log(userData)
        console.log(postFeed)
    }

    useEffect(() => {
        getUserProfile()
        
    }, [])

    const feed = userData.posts.reverse().map((post, index) => {
        return <Post key={post._id} post={post}/>
    })

    // <div>
    //         <h1>{userData.username}</h1>
            
    //         <h3>Total posts: {userData.posts.length}</h3>
    //         <h3>Upvotes received: {userData.upvote}</h3>
    //         <div>
    //             <h3>{userData.username}'s Posts</h3>
    //             {feed()}
    //         </div>
            

    //     </div>

    return(
            <div>
                <h1>{userData.username}</h1>
                <h3>Total posts: {userData.posts.length}</h3>
                <h3>Upvotes received: {userData.upvote}</h3>
                {postFeed.length > 0 && (
                    <div>
                        {feed}
                    </div>
                )}
            </div>
            
            
        
        
    )
}

export default Profile