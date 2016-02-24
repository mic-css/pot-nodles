// CommonJS
module.exports = function (request, response, next) {
  // '+' converts Date obj into ms elapsed since 1 Jan, 1970
  var start  = +new Date();
  var stream = process.stdout;
  var url    = request.url;
  var method = request.method;
  // Response obj is an EventEmitter (it emits 'finish' when response
  // has completed and handed off to OS)
  response.on('finish', function () {
    var duration = +new Date() - start;
    var message = method + ' to ' + url +
      '\ntook ' + duration + ' ms \n\n';
    stream.write(message);
  });
  // Moves request to next middleware in stack
  next();
}
