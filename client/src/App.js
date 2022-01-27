import { useState, useEffect } from 'react'
import { Routes, Route} from 'react-router-dom'
import './App.css'
import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core'
import useStyles from './styles/app.styles'

//import components
import BlogPosts from './components/BlogPosts'
import BlogPostsForm from './components/BlogPostsForm'
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Layout>
    
  );
}

export default App;
