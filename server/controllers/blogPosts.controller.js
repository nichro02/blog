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
    BlogPost.deleteOne({_id: id})
    .then(data => {
        if(!data){
            return res.status(400).send({message: 'There was an issue deleting this post'})
        } else {
            res.send(data)
        }
    })
}

//upvote single post
exports.upvote = (req, res) => {
    //add upvote to corresponding post
    BlogPost.findByIdAndUpdate(req.body.id, {$inc:{upvote: 1}},
        (error, post) => {
            if(error){
                res.status(500).send({message: err})
                return
            } else {
                //res.send({message: 'Upvote processed'})
                console.log('Upvote count on post processed')
                //return
            }

        }
    )
    //add upvote to author's user record
    User.findByIdAndUpdate(req.body.authorId, {$inc: {upvote: 1}},
        (error, author) => {
            if(error){
                res.status(500).send({message: err})
                return
            } else {
                res.send({message: 'Upvote processed'})
                console.log('Upvote count on user updated')
                //return
            }
        }
    )
}

//downvote a single vote
exports.downvote = (req, res) => {
    //increment downvote on post
    BlogPost.findByIdAndUpdate(req.body.id, {$inc:{downvote: 1}},
        (error, post) => {
            if(error){
                res.status(500).send({message: err})
                return
            } else {
                //res.send({message: 'Downvote processed'})
                console.log('Downvote count on post processed')
                //return
            }
        }
    )
    //increment downvote on user record
    User.findByIdAndUpdate(req.body.authorId, {$inc: {downvote: 1}},
        (error, author) => {
            if(error){
                res.status(500).send({message: err})
                return
            } else {
                res.send({message: 'Downvote processed'})
                console.log('Downvote count on user updated')
            }

        }
    )
}

//save post to favorites
exports.favoritePost = (req, res) => {
    //find user and push id of favorited post into their favoritePosts array
    User.findByIdAndUpdate(req.body.userId,{$push: {favoritePosts: req.body.id}},
        (error, post) => {
            if(error){
                res.status(500).send({message: 'There was an error favoriting this post'})
                return
            } else {
                res.send('Post saved as favorite')
            }
        }
    )
}

//remove post from user's favorites arrary
exports.unfavorite = (req, res) => {
    User.findByIdAndUpdate(req.body.userId, {$pull: {favoritePosts: req.body.id}},
        (error, post) => {
            if(error){
                res.status(500).send({message: error})
                return
            } else {
                res.send('Post removed from favorites')
            }
        }
    )
}

//re-post an existing post
exports.rePost = async (req, res) => {
    //create a post record and pull in info about originating post
    const { title, body, tags, originalAuthor, originalPost } = req.body

    //set up new record
    const rePost = new BlogPost({
        title,
        body,
        tags,
    })
    rePost.author = req.body.userId
    rePost.isRepost = true
    
    //save re-post to user's array of posts
    User.findById(req.body.userId, (error, user) =>{
        //add new post id to posts array
        if(error) {
            res.status(500).send({message: 'There was an errror re-posting the post'})
            return
        } else {
            user.posts.push(rePost._id)
        }
        //save the repost
        rePost.save((error) => {
            if(error) {
                res.status(500).send({message: 'There was an errror saving the post'})
                return
            } else {
                console.log('Repost successfully saved')
            }
        })
        //save updated user to preserve updated array
        user.save((error) => {
            if(error) {
                res.status(500).send({message: 'There was an errror updating the users post array'})
                return
            } else {
                console.log('Post array successfully updated')
            }
        })
    })
    //update repost count on original post
    await BlogPost.findByIdAndUpdate(originalPost,{$inc: {reposts: 1}},
        (error, author) => {
            if(error){
                res.status(500).send({message: err})
                return
            } else {
                res.send({message: 'Repost count updated'})
                console.log('Repost count updated on original post')
            }

        })
}

//reply to a post
exports.reply = (req, res) => {
    //set up similar to repost
    //create a post record and pull in info about originating post
    const { title, body, tags, originalAuthor, originalPost } = req.body

    //set up new record
    const reply = new BlogPost({
        title,
        body,
        tags,
    })
    reply.author = req.body.userId
    reply.isReply = true
    //save re-post to user's array of posts
    User.findById(req.body.userId, (error, user) =>{
        //add new post id to posts array
        if(error) {
            res.status(500).send({message: 'There was an errror adding the reply'})
            return
        } else {
            user.posts.push(reply._id)
        }
        //save the repost
        reply.save((error) => {
            if(error) {
                res.status(500).send({message: 'There was an errror saving the reply'})
                return
            } else {
                console.log('Reply successfully saved')
            }
        })
        //save updated user to preserve updated array
        user.save((error) => {
            if(error) {
                res.status(500).send({message: 'There was an errror updating the users post array'})
                return
            } else {
                console.log('Post array successfully updated')
            }
        })
    })
}