import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { getCurrentUser, logout } from '../../services/auth.service'

import {Tabs, Tab, AppBar, Box} from '@material-ui/core'


const Layout = (props) => {
    //structure: container div->nav bar->props.children to wrap components in Layout
    const [currentUser, setCurrentUser] = useState(undefined)

    //get current user if there is one
    useEffect(() => {
        const user = getCurrentUser()
        if(user){
            setCurrentUser(user)
        }

    }, [])

    const removeUser = () => {
        logout()
    }

    let profileUrl=null

    if(currentUser){
        profileUrl='/profile/' + currentUser.id
    }

    return(
        <div>
            <AppBar>
                <Link to='/'>
                    <strong>App Name</strong>
                </Link>
                <div>
                    
                        <Link to={'/'}>Home</Link>
                    
                    {currentUser && (
                        
                            <Link to={profileUrl}>My Profile</Link>
                        
                    )}
                    {currentUser ? (
                        <div>
                            <li>
                                <a href='/login' onClick={removeUser}>
                                    Logout
                                </a>
                            </li>
                            
                        </div>    
                    ) : (
                        <div>
                            
                                <Link to={'/login'}> Log In</Link>
                            
                            
                                <Link to={'/register'}> Sign Up</Link>
                            
                        </div>
                    )}
                </div>
            </AppBar>
            <div style={{padding: 80}}>{props.children}</div>
        </div>
    )
}

export default Layout