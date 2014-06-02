var passport = require('passport');
var User = require('../models/user');

/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.register = function(req, res) {
   res.render('register', { });
};

exports.registerPost = function(req, res) {
   User.register(new Account({username: req.body.username, firstName: req.body.firstName}), 
            req.body.password, function(err, account) {
               if (err) {
                  return res.render('register', {account: account});
               }

               passport.authenticate('local')(req, res, function() {
                  res.redirect('/');
               });
            }
   );
}

exports.login = function(req, res) {
   res.render('login', {user: req.user});
};

exports.loginPost = function(req, res) {
   res.redirect('/');
};

exports.logout = function(req, res) {
   req.logout();
   res.redirect('/');
};
