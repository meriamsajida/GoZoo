var express = require('express');
var appExpress = express();

var animalController = require('./server/controllers/animalController');
animalController(appExpress);

//appExpress.use(express.static(__dirname + '/public'));
appExpress.use("/", express.static(__dirname + '/public'));

// Ecouter les requetes HTTP sur le port 8888
appExpress.listen(8888, function () {
  console.log('Ready');
});
