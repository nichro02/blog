import { useState } from 'react'
import { getCurrentUser } from '../../services/auth.service'
import { newPost } from '../../services/post.service'
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
        const tags = []
        //push tags to tags array
        let tagArray = post.split(" ")
        tagArray.forEach(word => {
            tags.push(word)
        })
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