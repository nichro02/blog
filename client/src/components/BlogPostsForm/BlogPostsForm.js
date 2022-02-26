import { useState } from 'react'
import { getCurrentUser } from '../../services/auth.service'
import { newPost, reply } from '../../services/post.service'
// import Form from 'react-validation/build/form'
// import Input from 'react-validation/build/input'

//import components
import FormGroup from '../FormGroup/FormGroup'

const BlogPostForm = (props) => {
    //const form = useRef()
    //manage state
    const [post, setPost] = useState("")
    
    const currentUser = getCurrentUser()

    //track post form changes
    const onChange = e => {
        const content = e.target.value
        setPost(content)
    }

    //handle post submission
    const handleNewPost = e => {
        const originalPost = props.originalPost.id
        const originalAuthor = props.originalAuthor.author
        const tags = []
        //push tags to tags array
        let tagArray = post.split(" ")
        tagArray.forEach(word => {
            if(word.charAt(0) === '#') {
                tags.push(word)
            }
        })
        if (originalPost) {
            reply(
                post,
                tags,
                originalAuthor,
                originalPost
            )
        }
    }

    return(
        <div>
            {currentUser && (
                <form onSubmit={handleNewPost}>
                    <div>
                        <textarea
                            value={post}
                            onChange={onChange}
                            placeholder='Write your post here'
                        ></textarea>
                        <button
                            type='submit'
                            value='Submit'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default BlogPostForm