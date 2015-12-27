// Configuration des routes (path -> controller -> template)
appGoZoo.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'defaultController',
      templateUrl: 'views/home.html'
    })
    .when('/1d', {
      controller: 'oneDimController',
      templateUrl: 'views/1d.html'
    })
    .when('/2d', {
      controller: 'twoDimController',
      templateUrl: 'views/2d.html'
    })
    .when('/3d', {
      controller: 'threeDimController',
      templateUrl: 'views/3d.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}])
