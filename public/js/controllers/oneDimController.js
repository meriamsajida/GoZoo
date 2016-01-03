appGoZoo.controller("oneDimController", function($scope, $http) {

  console.log("oneDimController");

  intialize($scope,$http);

  applyFilter($scope, $http);

  bindEvents($scope, $http);

});

var intialize = function($scope, $http) {
  console.log("Intialize");

  $scope.title = "1D";
  $scope.description = "Affichage des données du zoo avec la possibilité de filtrage";

  var url = 'http://localhost:8888/filter';
  $http.get(url).then(function(response) {
    $scope.filter = response.data;
  });
}

var applyFilter = function($scope, $http) {
  console.log('applyFilter()');
  console.log($scope.filterAnimalsSelectedAlimentation);
  console.log($scope.filterAnimalsSelectedFamily);

  // Si les deux filtres (alimentation et famille) sont sélectionnés
  if($scope.filterAnimalsSelectedAlimentation && $scope.filterAnimalsSelectedFamily)
  {
    var url = 'http://localhost:8888/animals/criteria/' + $scope.filterAnimalsSelectedAlimentation.name + '/' + $scope.filterAnimalsSelectedFamily.name;
  }
  // Sinon, si l'alimentation est sélectionée
  else if($scope.filterAnimalsSelectedAlimentation)
  {
    var url = 'http://localhost:8888/animals/alimentation/' + $scope.filterAnimalsSelectedAlimentation.name;
  }
  // Sinon, si la famille est sélectionée
  else if($scope.filterAnimalsSelectedFamily)
  {
    var url = 'http://localhost:8888/animals/famille/' + $scope.filterAnimalsSelectedFamily.name;
  // Sinon et par défaut (aucun filtre n'est sélectionné)
  } else {
    var url = 'http://localhost:8888/animals';
  }

  console.log("$http.get : " + url);

  // Récupérer les données du serveur
  // TODO à mettre dans un service ou une factory Angular
  $http.get(url).then(function(response) {
    $scope.animals = response.data;
  });
}

// Mettre dans le scope les fonctions de gestion des événements
var bindEvents = function($scope, $http) {

  // Gestion du changement de l'alimentation ou la famille sélectionnée
  $scope.filterChange = function()
  {
    applyFilter($scope, $http);
  }

}
