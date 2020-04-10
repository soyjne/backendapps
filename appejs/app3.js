var express = require("express")
var app = express()

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/enamorandosede/:algo', function (req, res) {
  var mything = req.params.algo
  res.render('love', {thingVar: mything});
});

app.get('/posts', function (req, res) {
  var myposts = [{title:"Titulo1", author:"Jorge"},
                 {title:"Titulo2", author:"Pedro"}, 
                 {title:"Titulo3", author:"Mara"}];
  res.render('posts', {posts: myposts});
});


app.get('*', function (req, res) {
  res.send('Sorry, page not found. What are you doing with your life?');
});

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function () {

  console.log( "Listening on " + server_ip_address + ", port " + server_port )

});