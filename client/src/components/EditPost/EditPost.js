import { useState, useEffect } from 'react'
import { editPost } from '../../services/post.service'
import { getCurrentUser } from '../../services/auth.service'
import { useParams } from 'react-router'

const EditPost = props => {
    const { id } = useParams()
    console.log(id)

    const currentUser = getCurrentUser()
    const [post, setPost] = useState('')
    

    console.log(props)
    useEffect(() => {
        //setPost(props.post.body)
        
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
        <h1>EDIT POST {id} HERE</h1>
    )
}

export default EditPost