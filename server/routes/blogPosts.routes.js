const controller = require('../controllers/blogPosts.controller')

module.exports = function(app) {
    app.use((req,res, next)=> {
        //set header and allow use of x access token (we will use this to pass our token)
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-type, Accept"
        );
        next();
    })

    //Get all posts
    app.get('/api/post/all', controller.getAllBlogPosts)

    //Post a new entry
    app.post('/api/post/new', controller.addNewPost)

    //Edit an existing post
    app.put('/api/post/edit', controller.updateOnePost)

    //Increment upvote for a single post
    app.put('/api/post/upvote', controller.upvote)

    //Increment downvote for a single post
    app.put('/api/post/downvote', controller.downvote)

    //Favorite a post
    app.put('/api/post/favorite', controller.favoritePost)

    //Un-favorite a post
    app.put('/api/post/unfavorite', controller.unfavorite)

    //Delete a single post
    app.delete('/api/post/delete', controller.deletePost)

    //Get single post
    app.get('/api/post/:idx', controller.getOnePost)
}

