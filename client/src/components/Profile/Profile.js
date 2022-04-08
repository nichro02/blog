import { useState, useEffect } from 'react'
import { getCurrentUser } from '../../services/auth.service'
import { userProfile } from '../../services/user.service'
import { useParams } from 'react-router'

const Profile = (props) => {
    const [userData, setUserData] = useState(null)
    const { id } = useParams()
    console.log(id)
    
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

    return(
        <div>
            <h1>{userData.username}</h1>
            <h3>Total posts: {userData.posts.length}</h3>
            <h3>Upvotes received: {userData.upvote}</h3>
        </div>
        
    )
}

export default Profile