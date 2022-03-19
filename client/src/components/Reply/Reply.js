import { useEffect, useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import { onePost,reply } from '../../services/post.service'
import { useParams } from 'react-router'
import { getCurrentUser } from '../../services/auth.service'


const Reply = (props) => {
    const currentUser = getCurrentUser()
    const location = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    console.log(id)
    //const { from } = location.state
    //const originalPost = from._id
    //console.log(from)
    // console.log(from.title)
    //manage state
    const [title, setTitle] = useState('')
    const [post, setPost] = useState('')
    const [originalAuthor, setOriginalAuthor] = useState('')
    const [originalPostBody,setOriginalPostBody] = useState('')
    const [originalPostId,setOriginalPostId] = useState('')
    const [test, setTest] = useState({})

    // need to use URL param to preserve reply information
    const getOriginalPost = () => {
        onePost(id)
        .then(response => {
            console.log(response.data[0])
            setTitle(response.data[0].title)
            setOriginalPostBody(response.data[0].body)
            setOriginalPostId(response.data[0]._id)
            setOriginalAuthor(response.data[0].author[0])
        })
    }

    useEffect(() => {
        getOriginalPost()
    }, [])
    
    //track post form changes
    const onChange = e => {
        const content = e.target.value
        setPost(content)
    }
    //process reply
    const handleReply = e => {
        // const originalAuthor = from.author[0]._id
        // const originalPost = from.id
        const tags = []
        const author=currentUser.id
        //push tags to tags array
        let tagArray = post.split(" ")
        tagArray.forEach(word => {
            if(word.charAt(0) === '#') {
                tags.push(word)
            }
        })
        reply(
            title,
            post,
            tags,
            originalAuthor._id,
            originalPostId,
            author
        )
        // navigate(`/post/${from.id}`)
    }

    return(
        <div>
            <div>
            {title}
            {originalPostBody}
            {originalAuthor.username}
            Upvotes: 
            Downvotes: 
            Replies: 
            Reposts: 
            Favorites: 
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