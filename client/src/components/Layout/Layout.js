import { useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
//create auth services to get current user and handle logout

const Layout = (props) => {
    //structure: container div->nav bar->props.children to wrap components in Layout
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