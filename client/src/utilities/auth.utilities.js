import { getItem } from './localStorage.utilities'

export default function authHeader() {
    //get user
    const user = getItem('user')
    //check if user is authenticated
    if(user && user.accessToken){
        return {'x-axcess-token': user.accessToken}
    } else {
        return {}
    }
}