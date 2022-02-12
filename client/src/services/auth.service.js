import axios from 'axios'
import { getItem, setItem, removeItem } from '../utilities/localStorage.utilities'

const API_URL = 'http://localhost:4000/api/auth/'

//register new user
export const register = (username, email, password) => {
    return axios
    .post(API_URL+'register', {
        username,
        email,
        password
    })
}
//login existing user
export const login = (username,password) => {
    return axios
    .post(API_URL+'login', {
        username,
        password
    })
    .then(response => {
        if(response.data.accessToken){
            setItem('user', response.data)
        }
        return response.data
    })
}
//get current user
export const getCurrentUser = () => {
    return getItem('user')
}
//logout user
export const logout = () => {
    //removeItem('user')
    removeItem()
    window.location.reload()
}