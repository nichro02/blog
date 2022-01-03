const db = require('../models/index')
const { populate } = require('../models/user.model')

//Access database through User and BlogPost
const User = db.user
const BlogPost = db.blogPost

//get all blog posts
exports.getAllBlogPosts = async (req, res) => {
    try {
        const posts = await BlogPost.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

//post a new entry
exports.addNewPost = async (req, res) => {
  const { title, body, tags, fileUpload } = req.body

  //set up new record
  const createPost = new BlogPost({
      title,
      body,
      tags,
      fileUpload
  })

  //Reference the user as the author of the new post
    createPost.author.push(req.body.author)

    //Find the user and add user as author to the post
    User.findById(req.body.author, (err, user) => {
    if (err) {
        console.log(err)
    }
    user.posts.push(createPost._id)
    user.save()
    })

    //Test post id reference
    User.findById(req.body.author).populate('posts').
        exec((err, user) => {
            if (err) {
                console.log(err)
                return
            }
            console.log(user)
        })

  //save record to database
  createPost.save((error) => {
      if(error) {
          res.status(500).send({message: error})
      }
      res.send("Post created successfully")
  })

  
}
  //get single post
  exports.getOnePost = (req, res) => {
    const id = req.params.idx
    BlogPost.find({_id: id})
    .populate({
        path: 'replies',
        model: 'BlogPost'
    })
    .populate({
        path: 'author',
        model: 'User'
    })
    .then(post => {
        if(!post){
            return res.status(400).send({message: 'Error retrieving post'})
        } else {
            res.send(post)
        }
    })
  
}
//update single post
exports.updateOnePost = (req, res) => {
    const id = req.body.id
    BlogPost.updateOne({_id: id}, {
        body: req.body.body
    })
    .then(data => {
        if(!data){
            return res.status(400).send({message: 'There was a problem updating the post'})
        } else {
            res.send(data)
        }
    })
}

//delete single post
exports.deletePost = (req, res) => {
    const id = req.body.id
    Post.deleteOne({_id: id})
    .then(data => {
        if(!data){
            return res.status(400).send({message: 'There was an issue deleting this post'})
        } else {
            res.send(data)
        }
    })
}

//upvote single post