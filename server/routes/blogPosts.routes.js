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
    app.get('/api/posts/all', controller.getAllBlogPosts)
}

