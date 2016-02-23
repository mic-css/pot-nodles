# Some response anatomy

* Let's create a server: 
    ```var server = http.createServer(function(request, response){};```
* Inside the callback function we can add all of the following code:
  * header: 
      ```response.writeHead();```
  * body:
      ```response.write();```
  * end: 
      ```response.end();```
* We can pass various parameters to the response functions:
  * header: ex. ```200``` or ```404``` as a status code or a ```'content-type' 'text/plain'```
## Make sure code is bound to an event

* Bad example:

    ```
    var http = require('http');

    var server = http.createServer(function(request, response) {
      response.writeHead(200);
      response.write("Hello, this is dog");
      response.end();
    });

    server.listen(8080);
    ```

* Good example:

    ```
    var http = require('http');

    var server = http.createServer();

    server.listen(8080);

    server.on('request', function(request, response){
      response.writeHead(200);
      response.write("Hello, this is dog");
      response.end();
    });
    ```

* Now all the response code is bound to a "request" event and will trigger only when this specific named event occurs

## Pipe 

* Instead of manually listening for 'readable' and 'writable' events, we can use pipe!

* Bad example:

    ```
    http.createServer(function(request,response) {
      response.writeHead(200);
      request.on('readable', function(){
        var chunk = null;
        while(null !== (chunk = request.read())) {
          response.write(chunk);
        }
      });
      request.on('end', function(){
        response.end();
      });
    }).listen(8080)
    ```

* Good example:

    ```
      http.createServer(function(request,response) {
        response.writeHead(200);
        request.pipe(response);
        }
      });
    }).listen(8080)
    ```
