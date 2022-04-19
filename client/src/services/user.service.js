import axios from 'axios'
import authHeader from '../utilities/auth.utilities'

const API_URL = 'http://localhost:4000/api/'

//get user profile
export const userProfile = (id) => {
    
    return axios.get(API_URL + 'user/profile/' + id)
}

//follow user
export const followUser = (
    currentUser,
    followedUser
) => {
    return axios.put(API_URL + 'user/follow', {
        currentUser,
        followedUser
    })
}

//unfollow user
export const unfollowUser = (
    currentUser,
    unfollowedUser
) => {
    return axios.put(API_URL + 'user/follow', {
        currentUser,
        unfollowedUser
    })
}