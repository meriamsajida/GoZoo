
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost/gozoo';
//var console = require("console").Console;
 
 /**
  * Les variables du module.
  * @private
  */
var _appExpress;

/**
 * Module exports.
 * @public
 */
module.exports = MongoConnector;

/**
 * Initialize `AnimalController` with the given `appExpress`,
 *
 * @param {String} appExpress
 * @public
 */
function MongoConnector(appExpress) {
  _appExpress = appExpress;
  configRoute();
}

/**
 * Configuration des routes
 */
var configRoute = function (){
  _appExpress
    .get('/mongodb/filter', getFilter)
    .get('/mongodb/animals/:alimentation/:famille', getAnimals)
};

/**
 * Recupérer les filter
 */
var getFilter = function(req, res) {

  console.log("'/mongodb/filter'");

  MongoClient.connect(url,function(err,db){
    var cursor =db.collection('filter').find();
    cursor.each(function(err,doc)
    {
      assert.equal(err, null);
      if (doc != null) {
        console.log(doc); 
  
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');

        console.log(JSON.stringify(doc));

        res.end(JSON.stringify(doc));      
      } else {
        console.log("end");
      }
    })  
  });

  
};


//x = contenu de zoo.json
//x.Animaux.forEach(function(ele) { db.animals.insert(ele); }

/**
 * Les animaux filtés par aliemntation et par famille
 */
var getAnimals = function(req, res) {
  
  console.log('===============================================');
  console.log("'/mongodb/animals");

  console.log('req.params : ' + JSON.stringify(req.params));
  
  
  MongoClient.connect(url,function(err,db){
  
  var query = {};
  
  if(req.params.alimentation != "none"){
      query.Alimentation=req.params.alimentation;
  } 

  if(req.params.famille != "none"){
    query.Famille = req.params.famille;
  }
  
  console.log('query : ' + JSON.stringify(query) );


  
  Animaux = new Array();

  var cursor =db.collection('animals').find(query);
  cursor.each(function(err,doc)
  {

      assert.equal(err, null);
      if (doc != null) {
        Animaux.push(doc);
      } else {
        console.log(JSON.stringify(Animaux));

        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');

        res.end(JSON.stringify(Animaux));
      }
    })

    
  });

  
};