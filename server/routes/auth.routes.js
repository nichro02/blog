const controller = require('../controllers/auth.controller')

const verifySignup  = require('../middlewares/signup.middleware')

module.exports = function(app){
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-type, Accept"
        );
        next();
    })

    app.post('/api/auth/register', [verifySignup.checkDuplicateUsernameOrEmail], controller.signup)
    app.post('/api/auth/login', controller.signin)
}