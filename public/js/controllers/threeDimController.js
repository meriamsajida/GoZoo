appGoZoo.controller("threeDimController", function($scope, $routeParams) {
  $scope.title = "3D";
  $scope.description = "Géolocalisation dans le zoo avec un rendu 3D";
  
  start3d($routeParams.image);
});
