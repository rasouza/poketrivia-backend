var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var apiRouter = express.Router;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pokemonRouter = require('./routes/pokemon');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var v1Router = express.Router();

v1Router.use('/', indexRouter);
v1Router.use('/users', usersRouter);
v1Router.use('/pokemon', pokemonRouter);

app.use('/api/v1', v1Router);

module.exports = app;
