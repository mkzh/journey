/*
 * Author: Mike Zhang
 * Passport use take in large part from
 * http://mherman.org/blog/2013/11/11/user-authentication-with-passport-dot-js/#.U4vqA0VdVC0
 */


/**
 * Module dependencies.
 */
var fs = require('fs');
var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

// Bootstrap routes
var routes_path = './routes';
var routes = require(routes_path);
var user = require(routes_path + '/user.js');
var entry = require(routes_path + '/entry.js');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.cookieParser('Zheng He'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only 
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.configure('development', function() {
//    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
// });
//
// app.configure('production', function() {
//    app.use(express.errorHandler());
// });

// Configure Passport
var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to mongoose server
mongoose.connect('mongodb://localhost/journey');

// Establish default routes
app.get('/', routes.index);

// Establish user routes
app.get('/user', user.list);
app.get('/register', user.register);
app.post('/register', user.registerPost);
app.get('/login', user.login);
app.post('/login', passport.authenticate('local'), user.loginPost);
app.get('/logout', user.logout);

// Establish entry routes
app.get('/entry', entry.list);
app.get('/create', entry.create);
app.post('/save', entry.save);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
