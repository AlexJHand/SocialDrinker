var myApp = angular.module('myApp', ['ngRoute']);

/// Routes ///
myApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config')
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as uc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/search', {
      templateUrl: '/views/templates/search.html',
      controller: 'SearchController as sc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    }).when('/beer', {
      templateUrl: '/views/templates/beer.html',
      controller: 'SearchController as sc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    }).when('/brewery', {
      templateUrl: '/views/templates/brewery.html',
      controller: 'SearchController as sc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      redirectTo: 'home'
    });
});
