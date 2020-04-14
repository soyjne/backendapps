var request = require('request');
request('http://api.worldbank.org/v2/country/br?format=json', function(error, response, body) {
    if (!error && response.statusCode == 200){
        var bodyJson = JSON.parse(body);
        console.log(bodyJson[1][0]["id"]);
    };
});