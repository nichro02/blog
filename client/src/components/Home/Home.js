import { useState, useEffect } from 'react'
import BlogPostForm from '../BlogPostsForm/BlogPostsForm'
import Post from '../Post/Post'
import { allPosts } from '../../services/post.service'

const Home = (props) => {
    const [postFeed, setPostFeed] = useState([])
    const [update, setUpdate] = useState(0)

    //render all posts when page loads
    useEffect(() => {
        allPosts().
            then(response => {
                console.log(response)
                setPostFeed(response.data)
            }).
                catch(error => {
                    console.log(error)
                })
    }, [])

    const rerender = () => {
        setUpdate(update++)
    }

    const feed = postFeed.reverse().map((post, index) => {
        return <Post key={post._id} post={post} rerenderHome={rerender}/>
    })
    
    return(
        <div>
            <h1>Hello world from the home component</h1>
            <BlogPostForm />
            {feed}
        </div>
        
        
    )
}

export default Home