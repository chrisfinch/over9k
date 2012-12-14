
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , posts = require('./routes/posts')
  , projects = require('./routes/projects')
  , contact = require('./routes/contact')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

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

app.get('/', routes.index);
app.get('/users', user.list);

// POSTS
app.get('/posts/new', posts.create);
app.post('/posts/new', posts.create);

// PROJECTS
app.get('/projects/new', projects.create);
app.post('/projects/new', projects.create);

// CONTACT
app.post('/contact', contact.submit);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
