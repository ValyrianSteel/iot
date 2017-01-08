var http = require('http');

var port = 8080;
var address = process.argv[2];
var message = process.argv[3];

var req_options = {
  host: address,
  port: port,
  method: 'POST',
  headers: { 'Content-Length': message.length }
};

var req = http.request(req_options, function(res) {
  var body = '';
  res.on('data', function(data) {
    body += data;
  });
  res.on('end', function() {
    console.log(body);
  });
});


req.end(message);


