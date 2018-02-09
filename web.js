let methods = {
  run : function(client) {
    var express = require('express');
    let data = require('./Data/Quotes.json')
    var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, response) {
  response.sendFile(__dirname + '/views/index.html');
  var ip = client.getAPI(req);
  client.sendAPISPAM("/ - " + ip);
});

app.get("/TEST", function (req, response) {
  response.sendFile(__dirname + '/views/TEST-API.html');
  var ip = client.getAPI(req);
  client.sendAPISPAM("/TEST - " + ip);
})
    
app.get("/dreams", function (req, response) {
  response.send(client.dreams);
  var ip = client.getAPI(req);
  client.sendAPISPAM("/dreams - " + ip);
});
    
app.get("/ADMIN/points", function (req, response) {
  response.send(client.points);
})
    
app.get("/ADMIN/settings", function (req, response) {
  response.send(client.settings);
  //console.log(request)
})
    
app.get("/API/quote", async function (req, response) {
  response.send(await client.getQuote())
  var ip = client.getAPI(req);
  client.sendAPISPAM("/API/quote - " + ip);
})
    
app.get("/API/joke", async function (req, response) {
  response.send(await client.getJoke());
  var ip = client.getAPI(req);
  client.sendAPISPAM("/API/joke - " + ip);
})
    
app.get("/API/fortune", async function (req, response) {
  response.send(await client.getFortune());
  var ip = client.getAPI(req);
  client.sendAPISPAM("/API/fortune - " + ip);
})
    
app.get("/API", function (req, response) {
  response.sendFile(__dirname + '/views/TEST-API.html');
  var ip = client.getAPI(req);
  client.sendAPISPAM("/API - " + ip);
});
    
app.get('*', function(req, res){
  res.status(404).send('Hi there, this page does not exist but dont worry its not your fault !\n-Jackthehack21');
});


// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  client.dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
  }
}

module.exports = methods;