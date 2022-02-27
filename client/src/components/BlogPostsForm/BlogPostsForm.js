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
    const [post, setPost] = useState('')
    const [title, setTitle] = useState('')
    
    const currentUser = getCurrentUser()

    //track post form changes
    const onChange = e => {
        const content = e.target.value
        setPost(content)
    }

    //track title changes
    const onChangeTitle = e => {
        const content = e.target.value
        setTitle(content)
    }

    //handle post submission
    const handleNewPost = e => {
        // e.preventDefault()
        // console.log(props)
        const originalPost = props.originalPost
        const originalAuthor = props.originalAuthor
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
                title,
                post,
                tags,
                originalAuthor,
                originalPost
            )
        } else {
            
            newPost(
                title,
                post,
                tags,
                currentUser.id
            )
        }
    }

    return(
        <div>
            {currentUser && (
                <form onSubmit={handleNewPost}>
                    <div>
                        <textarea
                            value={title}
                            onChange={onChangeTitle}
                            placeholder='Write your title here'
                        >
                        </textarea>
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