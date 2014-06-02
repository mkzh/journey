var passport = require('passport');
var User = require('../models/user');

/*
 * GET users listing.
 */
exports.register = function(req, res) {
   res.render('register', { });
};

exports.registerPost = function(req, res) {
   
}

exports.list = function(req, res){
  res.send("respond with a resource");
};
