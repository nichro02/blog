import { useState, useEffect } from 'react'
import { editPost } from '../../services/post.service'
import { getCurrentUser } from '../../services/auth.service'

const EditPost = props => {
    const currentUser = getCurrentUser()
    const [post, setPost] = useState('')

    useEffect(() => {
        setPost(props.post.body)
    }, [])

    const onChangeEdit = e => {
        setPost(e.target.value)
    }

    const handlePostEdit = e => {
        editPost(props.post._id, post)
    }

    return(
        <div>
            {currentUser && (
                <form onSubmit={handlePostEdit}>
                    <label>
                        <input 
                            type='text'
                            value={post}
                            onChange={onChangeEdit}
                        />
                    </label>
                </form>
            )}
        </div>
    )
}

export default EditPost