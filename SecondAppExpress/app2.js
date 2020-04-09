var express = require("express")
var app = express()

app.get('/', function (req, res) {
  res.send('Hi there, welcome to my new assignment!');
});

app.get('/speak/:animal', function (req, res) {
  var myanimal = req.params.animal
  if (myanimal === 'pig') {
    res.send('The ' + myanimal +' says Oink!');
  }
  if (myanimal === 'cow') {
    res.send('The ' + myanimal +' says Muu!');
  } 
  if (myanimal === 'dog') {
    res.send('The ' + myanimal +' says Woof Woof!');
  }
});

app.get('/repeat/:word/:times', function (req, res) {
  var myword = req.params.word
  var mytimes = req.params.times
  var myphrase = ""
  for (var i = 1; i <= parseFloat(mytimes); i++) {
   myphrase = myphrase + myword + ' '
  }
  res.send(myphrase);
});

app.get('*', function (req, res) {
  res.send('Sorry, page not found. What are you doing with your life?');
});

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function () {

  console.log( "Listening on " + server_ip_address + ", port " + server_port )

});