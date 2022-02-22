import { useState } from 'react'
import { getCurrentUser } from '../../services/auth.service'
import { newPost } from '../../services/post.service'

const BlogPostForm = (props) => {

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
            New Blog Post Form
        </div>
    )
}

export default BlogPostForm