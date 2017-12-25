const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'please enter a valid email address'],
  },
  password: {
    type: String,
    trim: true,
    required: true,
    match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Your password must have at least 8 characters, one uppercase letter and one number'],
  },
  registered: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.statics.authenticate = (userEmail, password, callback) => {
  User.findOne({
    email: userEmail,
  }).exec((err, user) => {
    if (err) {
      return callback(err);
    } else if (!user) {
      const error = new Error('User not found.');
      error.status = 401;
      return callback(error);
    }
    bcrypt.compare(password, user.password, (error, result) => {
      if (result === true) {
        return callback(null, user);
      }
      return callback();
    });
    return false;
  });
};

/* eslint-disable */
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

// UserSchema.pre('save', (next) => {
//   const user = this;
//   bcrypt.hash(user.password, 10, (err, hash) => {
//     if (err) {
//       return next(err);
//     }
//     user.password = hash;
//     return next();
//   });
//   return false;
// });

const User = mongoose.model('User', UserSchema);
module.exports = User;
