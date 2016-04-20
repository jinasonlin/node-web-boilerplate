var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');

module.exports = new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function (username, password, done) {
  var options = {
    criteria: {
      $or: [{
        username: username
      }, {
        bindingMobile: username
      }, {
        bindingEmail: username
      }]
    }
  };
  User.load(options, function (err, user) {
    if (err) return done(err);
    if (!user) {
      return done(null, false, { message: 'Unknown user' });
    }
    if (!user.authenticate(password)) {
      return done(null, false, { message: 'Invalid password' });
    }
    return done(null, user);
  });
});
