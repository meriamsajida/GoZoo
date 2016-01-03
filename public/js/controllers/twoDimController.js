
appGoZoo.controller("twoDimController", function($scope, $http) {
	console.log("twoDimController");
	
	initalizeSVG($scope,$http);
	applyFilterSVG($scope,$http);
	bindEventsSVG($scope,$http);
});

var initalizeSVG =function($scope,$http){
	$scope.title = "2D";
	$scope.description = "Géolocalisation dans le zoo avec un rendu 2D";

	//var url = 'http://localhost:8888/filter';
	//$http.get(url).then(function(response) {
	//	$scope.filter = response.data;
	//});

	var url = 'http://localhost:8888/mongodb/filter';
	$http.get(url).then(function(response) {
		console.log(response.data);
		$scope.filter = response.data;
	});


	$scope.svg = d3.select("#alpha").append("svg").attr('height',"1080")
	.attr('width',"1920")
	.attr('style',"background-image:url(content/images/15.jpeg);");
}


var applyFilterSVG = function($scope, $http) {
  console.log('applyFilter()');
  
  var url = "http://localhost:8888/mongodb/animals/";
  if($scope.filterAnimalsSelectedAlimentation) {
    url +=$scope.filterAnimalsSelectedAlimentation.name +"/";
  } else {
  	url += "none/";
  }
  
  if($scope.filterAnimalsSelectedFamily) {
    url+=$scope.filterAnimalsSelectedFamily.name;
  }else {
  	url +="none";
  }

  console.log("$http.get : " + url);

  $http.get(url).then(function(response) {
  	console.log(response.data);
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

	// supprimmer les anciennes informations
	var ele= d3.select("#alpha")[0][0].firstChild;
	ele.innerHTML="";
	

	var nodes = $svg.selectAll(".node")
	.data($data)
	.enter()
	.append("g")
	.attr("class","node")
	.attr("transform", function(d) 
		{ return "translate(" + d.x + "," + d.y + ")"; })
	
	.on("click",function(d)
		{ var text =d3.select(this)[0][0].childNodes[1]; 
			if(text.innerHTML==JSON.stringify(d)){
				text.innerHTML = d.espece;
			} else {
				text.innerHTML = JSON.stringify(d);
			}
		});


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
	.attr("fill","cyan")
	.text(function(d) { return d.espece; })
	

}