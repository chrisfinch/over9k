
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , posts = require('./routes/posts')
  , projects = require('./routes/projects')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

// GLOBAL: Database
mongoose = require('mongoose');
db = mongoose.createConnection('localhost', 'over9k');
schemas = require('./config/schemas');
models = require('./config/models');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
  console.log('connected to db');
});

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
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

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
