
appGoZoo.controller("twoDimController", function($scope, $http) {
	console.log("twoDimController");
	
	initalizeSVG($scope,$http);
	applyFilterSVG($scope,$http);
	bindEventsSVG($scope,$http);
});

var initalizeSVG =function($scope,$http){
	$scope.title = "2D";
	$scope.description = "Géolocalisation dans le zoo avec un rendu 2D";

	var url = 'http://localhost:8888/filter';
	$http.get(url).then(function(response) {
		$scope.filter = response.data;
	});

	$scope.svg = d3.select("#alpha").append("svg").attr('height',"1080")
	.attr('width',"1920")
	.attr('style',"background-image:url(content/images/15.jpeg);");
}


var applyFilterSVG = function($scope, $http) {
  console.log('applyFilter()');
  
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
    afficherSVG(response.data,$scope.svg);
  });
}


// Mettre dans le scope les fonctions de gestion des événements
var bindEventsSVG = function($scope, $http) {

  // Gestion du changement de l'alimentation ou la famille sélectionnée
  $scope.filterChange = function()
  {
    applyFilterSVG($scope, $http);
  }

}


var afficherSVG = function($data, $svg){

	
	var ele= d3.select("#alpha")[0][0].firstChild;
	ele.innerHTML="";
	

	var nodes = $svg.selectAll(".node")
	.data($data)
	.enter()
	.append("g")
	.attr("class","node")
	.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });


	//nodes.append("circle")
	//.attr("r", function(d) {return 20 ;})
	//.style("fill", function(d) { return "red" ;})


	nodes.append("image")
	.attr("width","30")
	.attr("height","75")
	.attr("xlink:href", "http://www.clker.com/cliparts/B/l/M/x/J/M/map-pin-red-hi.png")
	


	nodes.append("text")
	.attr("dy", ".3em")
	.style("text-anchor", "middle")
	.text(function(d) { return d.espece; });
}