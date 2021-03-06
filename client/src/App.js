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
import SignUp from './components/SignUp/SignUp'
import Login from './components/Login/Login'
import Reply from './components/Reply/Reply'
import Profile from './components/Profile/Profile'
import EditPost from './components/EditPost/EditPost'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/post/:id' element={<Reply />} />
        <Route path='/post/edit/:id' element={<EditPost />} />
        <Route path='/profile/:id' element={<Profile />} />
      </Routes>
    </Layout>
    
  );
}

export default App;
