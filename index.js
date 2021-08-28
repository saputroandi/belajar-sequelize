const express = require('express');
var createError = require('http-errors');
const { port } = require('./app/config');
const userRouter = require('./app/user/router');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(port, () => {
  console.log('server running on port: ' + port);
});

module.exports = app;
