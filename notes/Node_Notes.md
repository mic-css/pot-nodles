# Some response anatomy

* Let's create a server: 
		```var server = http.createServer(function(request, response){};```

* Inside the callback function we can add all of the following code:
	* header: 
			```response.writeHead();```
	*	body:
			```response.write();```
	* end: 
			```response.end();```
* We can pass various parameters to the response functions:
	* header: ex. ```200``` or ```404``` as a status code or a ```'content-type':'text/plain'```

* In Node there are  **emitter** and **listener** objects. We can add multiple multiple functions to trigger on the same event by creating multiple handlers with the ```.on()``` function. From the node documentation:

> Much of the Node.js core API is built around an idiomatic asynchronous event-driven architecture in which certain kinds of objects (called "emitters") periodically emit named events that cause Function objects ("listeners") to be called.

> All objects that emit events are instances of the EventEmitter class. These objects expose an eventEmitter.on() function that allows one or more Functions to be attached to named events emitted by the object. Typically, event names are camel-cased strings.

> When the EventEmitter object emits an event, all of the Functions attached to that specific event are called synchronously.

# Make sure code is bound to an event

* Bad example:

		var http = require('http');

		var server = http.createServer(function(request, response) {
		  response.writeHead(200);
		  response.write("Hello, this is dog");
		  response.end();
		});

		server.listen(8080);

* Good example:

		var http = require('http');

		var server = http.createServer();

		server.listen(8080);

		server.on('request', function(request, response){
		  response.writeHead(200);
		  response.write("Hello, this is dog");
		  response.end();
		});

* Now all the response code is bound to a "request" event and will trigger only when this specific named event occurs