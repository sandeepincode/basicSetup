const express = require('express');
const User = require('../../models/User');

const router = express.Router();

// Checking user session validity
router.get('/auth', (req, res) => {
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
  return res.json({
    response: 0,
  });
});


//  Login/New User
router.post('/auth', (req, res) => {
  if (req.body.email &&
      req.body.password &&
      req.body.passwordConf) {
    const userData = {
      email: req.body.email,
      password: req.body.password,
    };

    User.create(userData, (error, user) => {
      if (error) {
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
          msg: error,
        });
      }
      req.session.userId = user._id;
      return res.send({
        response: 1,
      });
    });
  } else {
    return res.json({
      response: 0,
      msg: 'Required Fields',
    });
  }
  return res.json({});
});

module.exports = router;
