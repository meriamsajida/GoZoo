// Configuration des routes (path -> controller -> template)
appGoZoo.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'defaultController',
      templateUrl: 'public/views/home.html'
    })
    .when('/1d', {
      controller: 'oneDimController',
      templateUrl: 'public/views/1d.html'
    })
    .when('/2d', {
      controller: 'twoDimController',
      templateUrl: 'public/views/2d.html'
    })
    .when('/3d', {
      controller: 'threeDimController',
      templateUrl: 'public/views/3d.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}])
