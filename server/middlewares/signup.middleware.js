const db = require('../models/index')

const User = db.user

checkDuplicateUsernameOrEmail = (req, res, next) => {
    //console.log(req.body)
    //check username
    User.findOne({
      username: req.body.username
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: " Username is already in use" });
        return;
      }
      // Email
      User.findOne({
        email: req.body.email
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (user) {
          res.status(400).send({ message: "Email is already in use" });
          return;
        }
        next();
      })
    })
}

const verifySignup = {
    checkDuplicateUsernameOrEmail
}

module.exports = verifySignup