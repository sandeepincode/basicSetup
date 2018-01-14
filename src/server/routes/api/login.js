const express = require('express');
const User = require('../../models/User');
const router = express.Router();

// Checking user session validity
router.get('/login', (req, res) => {
  User.findById(req.session.userId).exec((error, user) => {
    if (error) {
      return res.json({
        response: 0,
        msg: error,
      });
    } else if (user === null) {
      return res.json({
        response: 0,
        msg: 'User was not registered',
      });
    }
    return res.json({
      response: 1,
    });
  });
});

//  Login/New User
router.post('/login', (req, res) => {
  if (req.body.email &&
      req.body.password &&
      req.body.passwordConf) {

    if (req.body.password !== req.body.passwordConf) {
      return res.json({
        response: 0,
        msg: 'Passwords entered do not match',
      });
    }

    const userData = {
      email: req.body.email,
      password: req.body.password,
    };

    User.create(userData, (error, user) => {
      if (error) {
        const keys = Object.keys(error.errors);
        keys.forEach((key) => {
          //error+= error.errors[key].message + ' '
          console.log(error.errors[key].message);
        });
        return res.json({
          response: 0,
          msg: error,
        });
      }
      req.session.userId = user._id;
      return res.json({
        response: 1,
      });
    });
  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, (error, user) => {
      if (error || !user) {
        return res.json({
          response: 0,
          msg: 'This acccount is not registered',
        });
      }
      req.session.userId = user._id;
      return res.json({
        response: 1,
      });
    });
  } else {
    return res.json({
      response: 0,
      msg: 'Looks Like You Have Some Missing Fields',
    });
  }
});

module.exports = router;
