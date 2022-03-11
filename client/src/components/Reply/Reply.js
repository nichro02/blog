import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { getCurrentUser } from '../../services/auth.service'

const Reply = (props) => {
    const currentUser = getCurrentUser()
    const location = useLocation()
    const { from } = location.state
    console.log(from)
    console.log(from.title)
    return(
        <h1>REPLY HERE</h1>
    )
}

export default Reply