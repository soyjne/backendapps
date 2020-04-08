var express = require("express")
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/bye', function (req, res) {
  res.send('GoodBye!');
});

app.get('/dogs', function (req, res) {
  console.log("Hubo un request de Get a Dogs")
  res.send('Wow!');
});

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function () {

  console.log( "Listening on " + server_ip_address + ", port " + server_port )

});