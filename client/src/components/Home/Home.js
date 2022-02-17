import { useState, useEffect } from 'react'
import BlogPostForm from '../BlogPostsForm/BlogPostsForm'

const Home = () => {
    return(
        <div>
            <h1>Hello world from the home component</h1>
            <BlogPostForm />
        </div>
        
        
    )
}

export default Home