import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { getCurrentUser } from '../../services/auth.service'

const Reply = (props) => {
    const currentUser = getCurrentUser()
    const location = useLocation()
    const { from } = location.state
    console.log(from)
    console.log(from.title)
    const [post, setPost] = useState('')
    //track post form changes
    const onChange = e => {
        const content = e.target.value
        setPost(content)
    }
    return(
        <div>
            <div>
            {from.title}
            {from.body}
            Upvotes: {from.upvote}
            Downvotes: {from.downvote}
            Replies: {from.replies}
            Reposts: {from.reposts}
            Favorites: {from.favorites}
            </div>
            <div>
            {currentUser && (
                <div>
                <h3>Your Reply</h3>
                <form>
                    <textarea
                            value={post}
                            onChange={onChange}
                            placeholder='Write your reply here'
                    ></textarea>
                    <button
                        type='submit'
                        value='Submit'
                    >
                        Submit
                    </button>
                </form>
                </div>
            )}
        </div>
        
            
        </div>
    
        
    )
}

export default Reply