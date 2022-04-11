import { useState, useEffect } from 'react'
import { getCurrentUser } from '../../services/auth.service'
import { userProfile } from '../../services/user.service'
import { useParams } from 'react-router'
import Post from '../Post/Post'

const Profile = (props) => {
    const [userData, setUserData] = useState(null)
    //const [postFeed, setPostFeed] = useState([])
    const { id } = useParams()
    console.log(id)
    const currentUser=getCurrentUser()

    //retrieve user info
    const getUserProfile = () => {
        userProfile(id)
        .then(response => {
            console.log(response)
            setUserData(response.data)
            console.log(userData)
        })
    }

    useEffect(() => {
        getUserProfile()
    }, [])

    const feed = userData.posts.reverse().map((post, index) => {
        return <Post key={post._id} post={post}/>
    })

    return(
        <div>
            <h1>{userData.username}</h1>
            {(currentUser.id !== userData._id && userData.followed.indexOf(currentUser.id) === -1) && (
                <button>Follow</button>
            )}
            <h3>Total posts: {userData.posts.length}</h3>
            <h3>Upvotes received: {userData.upvote}</h3>
            <div>
                <h3>{userData.username}'s Posts</h3>
                {feed}
            </div>
            

        </div>
        
    )
}

export default Profile