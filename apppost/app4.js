var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/cat_app', { useNewUrlParser: true, useUnifiedTopology: true });

var friendSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

var Friend = mongoose.model("Friend", friendSchema);

//Agregar friend a la DB

//var amigo = new Friend({
//  name: "Maru",
//  age: 31,
//  temperament: "Remix"
//});

//amigo.save (function(err,friend){
//  if (err){
//    console.log("HUBO UN ERROR")
//  }else{
//    console.log("FRIEND AGREGADO")
//    console.log(friend)
//  };
//});

//Otra opcion para agregar friend a la DB

// Friend.create ({
//   name: "Colo",
//   age: 31,
//   temperament: "Calvo"
// }, function(err,friend){
//   if (err){
//     console.log("HUBO UN ERROR")
//   }else{
//     console.log("FRIEND AGREGADO")
//     console.log(friend)
//   };
// });

// Consultar friends

// Friend.find ({}, function(err,friends){
//   if (err){
//     console.log("HUBO UN ERROR")
//   }else{
//     console.log("FRIENDS ENCONTRADOS")
//     console.log(friends)
//   };
// });



app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var friends = ["Juan", "Perla", "Gonzalo", "Flora"];

app.get('/', function (req, res) {
  res.render('home');
});

app.post("/addFriend", function(req, res) {
    var newFriend = req.body.newfriend;
    var newAge = req.body.newage;
    var newSkill = req.body.newskill;
    // Add newFriend to to the db
    Friend.create ({
      name: newFriend,
      age: newAge,
      temperament: newSkill
    }, function(err,friend){
      if (err){
        console.log("HUBO UN ERROR")
      }else{
        res.redirect("/friends");
      };
    });
});

app.get("/friends", function(req, res) {
  Friend.find ({}, function(err,allfriends){
      if (err){
        console.log("HUBO UN ERROR")
      }else{
        res.render("friendspage", {friendsVar: allfriends});
      };
  });    
});

//SHOW GET
app.get("/friends/:id", function(req, res) {
  Friend.findById (req.params.id, function(err,foundFriend){
    if (err){
      console.log("HUBO UN ERROR " + err)
    }else{
      res.render("show", {friendsVar: foundFriend});
    }
  });    
});


app.get('*', function (req, res) {
  res.send('Sorry, page not found. What are you doing with your life?');
});

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function () {

  console.log( "Listening on " + server_ip_address + ", port " + server_port )

});