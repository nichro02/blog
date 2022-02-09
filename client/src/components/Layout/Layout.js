import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
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

    return(
        <div>
            <nav>
                <h1>This is the navbar</h1>
            </nav>
            <div>{props.children}</div>
        </div>
    )
}

export default Layout