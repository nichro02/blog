import { useState, useEffect } from 'react'
import { editPost } from '../../services/post.service'
import { getCurrentUser } from '../../services/auth.service'
import { useParams } from 'react-router'
import { onePost } from '../../services/post.service'

const EditPost = props => {
    const { id } = useParams()
    console.log(id)

    const currentUser = getCurrentUser()
    const [post, setPost] = useState('')
    const [title, setTitle] = useState('')
    
    const getOriginalPost = () => {
        onePost(id)
        .then(response => {
            console.log(response.data)
            setPost(response.data[0].body)
            setTitle(response.data[0].title)
        })
    }

    console.log(props)
    useEffect(() => {
        //setPost(props.post.body)
        getOriginalPost()
    }, [])

    const onChangeEdit = e => {
        //setPost(e.target.value)
    }

    const handlePostEdit = e => {
        editPost(props.post._id, post)
    }

    // <div>
    //         {currentUser && (
    //             <form onSubmit={handlePostEdit}>
    //                 <label>
    //                     <input 
    //                         type='text'
    //                         value={post}
    //                         onChange={onChangeEdit}
    //                     />
    //                 </label>
    //             </form>
    //         )}
    //     </div>

    return(
        <div>
            <h1>EDIT POST {id} HERE</h1>
            <h2>Title: {title}</h2>
            <h3>Post: {post}</h3>
        </div>
        
    )
}

export default EditPost