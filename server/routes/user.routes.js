const authJwt  = require('../middlewares/auth.middleware')
const controller = require('../controllers/user.controller')

module.exports = function(app){
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-type, Accept'
        )
        next()
    })
    

    app.get("/api/test/user", [authJwt.verifyWebToken], controller.userBoard)
    //display user profile
    app.get('/api/user/profile/:id', controller.displayUserProfile)
    //follow user
    app.put('/api/user/follow', controller.follow)
    //unfollow user
    app.put('/api/user/unfollow', controller.unfollow)

}