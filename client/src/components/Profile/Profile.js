import { useState, useEffect } from 'react'
import { getCurrentUser } from '../../services/auth.service'
import { userProfile } from '../../services/user.service'
import { useParams } from 'react-router'

const Profile = (props) => {

    const { id } = useParams()
    console.log(id)
    const getUserProfile = () => {
        userProfile(id)
        .then(response => {
            console.log(response)
        })
    }

    useEffect(() => {
        getUserProfile()
    }, [])
    
    return(
        <h1>User Profile goes here</h1>
    )
}

export default Profile