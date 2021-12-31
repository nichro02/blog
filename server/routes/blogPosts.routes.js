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
    app.post('/api/post/', controller.addNewPost)

    //Get single post
    app.get('/api/post/:idx', controller.getOnePost)
}

