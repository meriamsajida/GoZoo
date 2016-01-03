var fs = require('fs');
var underscore = require('underscore');

 /**
  * Les variables du module.
  * @private
  */
var _appExpress;

/**
 * Module exports.
 * @public
 */
module.exports = AnimalController;

/**
 * Initialize `AnimalController` with the given `appExpress`,
 *
 * @param {String} appExpress
 * @public
 */
function AnimalController(appExpress) {
  _appExpress = appExpress;
  configRoute();
}

/**
 * Configuration des routes
 */
var configRoute = function (){
  _appExpress
    .get('/animals/criteria/:alimentation/:famille', animalsByCriteriaAction)
    .get('/animals/alimentation/:alimentation', animalsByAlimentationAction)
    .get('/animals/famille/:famille', animalsFamilleAction)
    .get('/animals', animalsAction)
    .get('/filter', getFilter)
};

/**
 * Les animaux filtés par aliemntation et par famille
 */
var animalsByCriteriaAction = function(req, res) {

  console.log('===============================================');
  console.log('router.get : ');
  console.log("'/animals/criteria/:alimentation/:famille'");

  console.log('req.params : ');
  console.log(req.params);

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');

  var jsonData = readJsonFile();

  var query = {
    "Alimentation": req.params.alimentation,
    "Famille": req.params.famille
  };

  console.log('query : ');
  console.log(query);

  var animals = underscore.where(jsonData.Animaux, query);

  res.end(JSON.stringify(animals));
};

/**
 *Les animaux filtés par aliemntation
 */
var animalsByAlimentationAction = function(req, res) {

  console.log('===============================================');
  console.log('router.get : ');
  console.log("'/animals/alimentation/:alimentation'");

  console.log('req.params : ');
  console.log(req.params);

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');

  var jsonData = readJsonFile();

  var query = {
    "Alimentation": req.params.alimentation
  };

  console.log('query : ');
  console.log(query);

  var animals = underscore.where(jsonData.Animaux, query);

  res.end(JSON.stringify(animals));
};

/**
 * Les animaux filtés par famille
 */
var animalsFamilleAction = function(req, res) {

  console.log('===============================================');
  console.log('router.get : ');
  console.log("'/animals/famille/:famille'");

  console.log('req.params : ');
  console.log(req.params);

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');

  var jsonData = readJsonFile();

  var query = {
    "Famille": req.params.famille
  };

  console.log('query : ');
  console.log(query);

  var animals = underscore.where(jsonData.Animaux, query);

  res.end(JSON.stringify(animals));
};

/**
 * Tous animaux
 */
var animalsAction = function(req, res) {

  console.log('===============================================');
  console.log('router.get : ');
  console.log("'/animals'");

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');

  var jsonData = readJsonFile();

  res.end(JSON.stringify(jsonData.Animaux));
};

/**
 * Action par défaut, redirege vers /animals
 */
var defaultAction = function(req, res) {

  console.log('===============================================');
  console.log('router.get : ');
  console.log("'/'");

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');

  console.log("res.redirect('/animals'");
  res.redirect('/animals');
};




/**
 * Recupérer les filter
 */
var getFilter = function(req, res) {

  console.log("'/filter'");

  
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');

  var jsonData = readJsonFilter();

  console.log(jsonData);

  //console.log(jsonData);
 
  res.end(JSON.stringify(jsonData));
};

/**
 * Lire le fichier data/zoo.json
 */
var readJsonFile = function() {
  var data = fs.readFileSync('./server/data/zoo.json');
  var dataJson = JSON.parse(data);

  return dataJson;
}


/**
 * Lire le fichier data/filter.json
 */
var readJsonFilter = function() {
  var data = fs.readFileSync('./server/data/filter.json');
  var dataJson = JSON.parse(data);
  return dataJson;
}