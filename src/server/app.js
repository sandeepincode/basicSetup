const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const connectMongo = require('connect-mongo');

const login = require('./routes/api/login');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();
const MongoStore = connectMongo(session);

// connect to MongoDB
mongoose.connect('mongodb://localhost/testdatabase');
const db = mongoose.connection;

// handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('We have connected to the data base');
});

// use sessions for tracking logins
app.use(session({
  secret: 'this is a secret',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db,
  }),
}));

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('api', login);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
