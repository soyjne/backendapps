var express = require("express");
var app = express();
var request = require('request');

app.set('view engine', 'ejs');

app.get("/", function(req, res) { 
    res.render("search");
});

app.get("/movies", function(req, res) { 
    var termabuscar = req.query.abuscar
    var url = 'http://www.omdbapi.com/?s=' + termabuscar + '&apikey=thewdb'
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200){
            var moviesdata = JSON.parse(body);
            res.render("moviespage", {moviesDic: moviesdata});
        };
    }); 
});

//Prueba

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function () {

  console.log( "Listening on " + server_ip_address + ", port " + server_port )

});