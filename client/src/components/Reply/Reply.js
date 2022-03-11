import { useEffect } from 'react'

import { getCurrentUser } from '../../services/auth.service'

const Reply = (props) => {
    const currentUser = getCurrentUser()
    console.log(props)
    return(
        <h1>REPLY HERE</h1>
    )
}

export default Reply