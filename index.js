const express = require('express');
var createError = require('http-errors');
const { port } = require('./app/config');
const userRouter = require('./app/user/router');
const photosRouter = require('./app/photo/router');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', userRouter);
app.use('/api', photosRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(port, () => {
  console.log('server running on port: ' + port);
});

module.exports = app;
