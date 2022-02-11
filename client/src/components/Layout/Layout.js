import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { getCurrentUser, logout } from '../../services/auth.service'


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
            <nav>
                <Link to='/'>
                    <strong>App Name</strong>
                </Link>
                <div>
                    <li>
                        <Link to={'/'}>Home</Link>
                    </li>
                    {currentUser && (
                        <li>
                            <Link to={profileUrl}>My Profile</Link>
                        </li>
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
                            <li>
                                <Link to={'/login'}> Log In</Link>
                            </li>
                            <li>
                                <Link to={'/register'}> Sign Up</Link>
                            </li>
                        </div>
                    )}
                </div>
            </nav>
            <div>{props.children}</div>
        </div>
    )
}

export default Layout