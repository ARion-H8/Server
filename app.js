require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const jwt = require('express-jwt');
const cors = require('cors');

const typeDefs = fs.readFileSync('./graphql/typeDefs.gql','utf-8');
const resolvers = require('./graphql/resolvers')
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const schema = makeExecutableSchema({ typeDefs, resolvers })
var app = express();

require('dotenv')
app.use('*', cors());


const username = process.env.USERNAME
const password = process.env.PASSWORD
const db = mongoose.connection

const auth = jwt({
  secret: process.env.SECRET,
  credentialsRequired: false
})

mongoose.connect(`mongodb://${process.env.USERNAME}:${password}@ds213199.mlab.com:13199/arion-db`)
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to mongoose')
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use('/graphql', auth,graphqlExpress(req => {
  return {
    schema,
    context: {
      user: req.user
    }
  }
}));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
