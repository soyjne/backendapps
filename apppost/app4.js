var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var friends = ["Juan", "Perla", "Gonzalo", "Flora"];

app.get('/', function (req, res) {
  res.render('home');
});

app.post("/addFriend", function(req, res) {
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

app.get("/friends", function(req, res) {
    res.render("friendspage", {friendsVar: friends});
});

app.get('*', function (req, res) {
  res.send('Sorry, page not found. What are you doing with your life?');
});

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function () {

  console.log( "Listening on " + server_ip_address + ", port " + server_port )

});