var express = require('express');
var app = express();

var logger = require('./logger');
// add custom logger middleware to the stack
app.use(logger);

/*
Express-static's #static() function substitutes the following:
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
*/
app.use(express.static('public'));

var dishes = require('./routes/dishes');
// All requests to '/dishes' path are dispatched to dishes router
app.use('/dishes', dishes);

app.listen(3000, function () {
  console.log('Listening on 3000\n\n');
});
