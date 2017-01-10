var fs = require('fs');
var http = require('http');
var gpio = require('gpio');

var port = 8080;
var result = '';

var ledPin = 27;

var server = http.createServer(function(req, res) {
  console.log('on request - url: ' + req.url);
  if (req.url == '/') {
    onIndex(req, res);
  } else if (req.url == '/light') {
    onLight(req, res);
  } else if (req.url == '/toggle') {
    onToggle(req, res);
  }
});


function onIndex(req, res) {
  fs.readFile('index.html', function(err, data) {
    if (err) {
      res.writeHead(500);
      res.end();
    } else {
      res.writeHead(200);
      res.end(data);
    }
  });
}

function onLight(req, res) {
  gpio.read(ledPin, function(err, value) {
    if (err) {
      res.writeHead(500);
      res.end();
    } else {
      res.writeHead(200);
      res.end(value ? "on" : "off");
    }
  });
}

function onToggle(req, res) {
  gpio.read(ledPin, function(err, value) {
    if (err) {
      res.writeHead(500);
      res.end();
    } else {
      gpio.write(ledPin, !value, function(err) {
        if (err) {
          res.writeHead(500);
          res.end();
        } else {
          res.writeHead(200);
          res.end(value ? "on" : "off");
        }
      });
    }
  });
}

gpio.initialize();

gpio.on('initialize', function() {
  console.log('GPIO initilized');
  gpio.open(ledPin, "out", "pushpull");
    console.log('GPIO led ready');
    server.listen(port);
});

gpio.on('error', function(err) {
  console.log(err);
  process.exit(1);
});
