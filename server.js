var express = require('express');
var appExpress = express();

var animalController = require('./server/controllers/animalController');
animalController(appExpress);

// Ecouter les requetes HTTP sur le port 8888
appExpress.listen(8888, function () {
  console.log('Ready');
});
