var express = require('express');
var appExpress = express();
var router = express.Router();

var animalController = require('./controllers/animalController');
animalController(router);

appExpress.use(router);

appExpress.listen(8888, function () {
  console.log('Ready');
});
