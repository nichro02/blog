import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { reply } from '../../services/post.service'

import { getCurrentUser } from '../../services/auth.service'

const Reply = (props) => {
    const currentUser = getCurrentUser()
    const location = useLocation()
    const { from } = location.state
    console.log(from)
    console.log(from.title)
    //manage state
    const [post, setPost] = useState('')
    //track post form changes
    const onChange = e => {
        const content = e.target.value
        setPost(content)
    }
    //process reply
    const handleReply = e => {
        const originalAuthor = from.author[0]._id
        const originalPost = from.id
        const tags = []
        //push tags to tags array
        let tagArray = post.split(" ")
        tagArray.forEach(word => {
            if(word.charAt(0) === '#') {
                tags.push(word)
            }
        })
        reply(
            post,
            tags,
            originalAuthor,
            originalPost
        )
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
                <form onSubmit={handleReply}>
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