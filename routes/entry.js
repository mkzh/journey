/*
 * Entry views
 */

exports.list = function(req, res) {
  res.send("respond with a resource");
}

exports.create = function(req, res) {
  res.render('create', {user: req.user});
}

exports.save = function(req, res) {
  
}
