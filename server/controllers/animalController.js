'use strict';

var fs = require('fs');
var underscore = require('underscore');

 /**
  * Module variables.
  * @private
  */
var _router;

/**
 * Module exports.
 * @public
 */
module.exports = AnimalController;

/**
 * Initialize `AnimalController` with the given `router`,
 *
 * @param {String} router
 * @public
 */
function AnimalController(router) {
  _router = router;
  configRoute();
}

/**
 * Configuration des routes
 */
var configRoute = function (){
  _router.get('/animals/criteria/:alimentation/:famille', animalsByCriteriaAction);

  _router.get('/animals/alimentation/:alimentation', animalsByAlimentationAction);

  _router.get('/animals/famille/:famille', animalsFamilleAction);

  _router.get('/animals', animalsAction);

  _router.get('/', defaultAction)
};

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

var animalsAction = function(req, res) {

  console.log('===============================================');
  console.log('router.get : ');
  console.log("'/animals'");

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');

  console.log('req.params : ');
  console.log(req.params);

  var jsonData = readJsonFile();

  var query = {};

  console.log('query : ');
  console.log(query);

  var animals = underscore.where(jsonData.Animaux, query);

  res.end(JSON.stringify(animals));
};

var defaultAction = function(req, res) {

  console.log('===============================================');
  console.log('router.get : ');
  console.log("'/'");

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');

  var dataJson = readJsonFile();

  res.end(JSON.stringify(dataJson));
};

var readJsonFile = function() {
  var data = fs.readFileSync('data/zoo.json');
  var dataJson = JSON.parse(data);

  return dataJson;
}
