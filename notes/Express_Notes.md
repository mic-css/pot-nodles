#Express

##Starting out 
* First we need to install express
  ```npm install --save express```
* Let's require the module in our file
  ```var express = require('express')```
* Now we can assign the module to our own variable
  ``` var app = express(); ```
* And to create a root route
  ```
  app.get('/', function(request, response){
    response.sendFile(__dirname + 'index.html');
  });
  ```
* We can also set up things like this:
  ```
  server.set('views', __dirname + '/views');
  server.set('view engine', 'ejs');

  server.get('/page3', function(request,response) {
    response.render('index');
  });
  ```
* Now let's add a listener:
  ```app.listen(8080);```