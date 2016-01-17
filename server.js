


var express = require('express');
var appExpress = express();


var animalController = require('./server/controllers/animalController');
animalController(appExpress);


var mongoConnector = require('./server/controllers/MongoConnector.js');
mongoConnector(appExpress);


appExpress.use("/", express.static(__dirname + '/public'));

// Ecouter les requetes HTTP sur le port 8888
appExpress.listen(8888, function () {
  console.log('Ready !');
  console.log('http://localhost:8888');
});
