
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , contact = require('./routes/contact')
  , admin = require('./routes/admin')
  , http = require('http')
  , path = require('path')
  , pwd = require('pwd');

// DATABASE ==============================

  mongoose = require('mongoose');

  // Connect to db, localhost if no ENV vars set
  var uristring =
    process.env.MONGODB_URI ||
    process.env.MONGOLAB_URI ||
    'mongodb://localhost/over9k';

  // Ensure safe writes
  var mongoOptions = { db: { safe: true }};

  db = mongoose.connect(uristring, mongoOptions, function (err, res) {
    if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
      console.log ('Succeeded connected to: ' + uristring);
    }
  });

  schemas = require('./config/schemas');
  models = require('./config/models');

// EMAIL =================================

  emailjs = require('emailjs');

  email = emailjs.server.connect({
    user:    "andgt9k",
    password:"pword456",
    host:    "smtp.gmail.com",
    ssl: true
  });

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser({
    uploadDir: './tmp'
  }));
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Middleware ===================================

var authenticate = function (name, pass, fn) {
  models.user.findOne ({username: name}, function(err, user) {
    if (!user) return fn(new Error('cannot find user'));
    pwd.hash(pass, user.salt, function(err, hash){
      if (err) return fn(err);
      if (hash == user.hash) return fn(null, user);
      fn(new Error('invalid password'));
    });
  });
};

var restrict = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
};

// Routes ===================================

  app.get('/', routes.index);

  // CONTACT
  app.post('/contact', contact.submit);

  // LOGIN ======================

  app.get('/login', admin.loginPage);

  app.post('/user/login', function(req, res){
    authenticate(req.body.username, req.body.password, function(err, user){
      if (user) {
        req.session.regenerate(function(){
          req.session.user = user;
          res.redirect('/admin');
        });
      } else {
        //res.redirect('login');
        console.log(err);
        res.send(err.stack);
      }
    });
  });

  app.get('/logout', function(req, res){
    if (req.session) {
      req.session.auth = null;
      res.clearCookie('auth');
      req.session.destroy(function() {});
    }
    res.redirect('/');
  });

  // ADMIN ======================
  app.get('/admin', restrict, admin.admin);

    app.post('/user/new', restrict, admin.createUser);

    // POSTS
    app.post('/posts/new', restrict, admin.createPost);

    // PROJECTS
    app.post('/projects/new', restrict, admin.createProject);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
