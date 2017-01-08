var http = require('http');


var port = 8080;
var server = http.createServer(function(req, res) {
  var body = '';
  req.on('data', function(data) {
    body += data;
  });
  req.on('end', function() {
    res.writeHead(200, { 'Content-Type' : 'text/plain' });
    res.end(body);
  });
});

server.listen(port, 5);

