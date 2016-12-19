var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var mongoose = require('mongoose');
var exphbs  = require('express-handlebars');

var routes = require('./views/pin');
var users = require('./views/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'templates'));

var hbs = exphbs.create({
  layoutsDir: "backend/templates/layouts",
  defaultLayout: 'base',
  extname: '.html',
})

app.engine('.html', hbs.engine);
app.set('view engine', '.html');

var mongo_uri = "mongodb://dishantchavda:root@ds139278.mlab.com:39278/heroku_dw61mjjx";
mongoose.connect(mongo_uri, function(err, db){
  if(err){
    console.log(err);
    process.exit(1);
  }
});

// uncomment after placing your favicon in /static
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({ 
    secret: 'LSK34DJF23KJH45JD',
    resave : true,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, 'static')));

app.use('/user', users);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      title:"Error",
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    title:"Error",
    message: err.message,
    error: {}
  });
});


module.exports = app;
