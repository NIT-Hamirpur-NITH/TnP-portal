var app = angular.module('tnp',['ngResource', 'ngRoute', 'ngCookies']);

app.config(function($routeProvider, $locationProvider){

  $locationProvider.html5Mode({ enabled: true, requireBase: false });
  var routeCheck = {
    admin: {
      auth: function(authService){
        return authService.authorizeRole('admin');
      }
    },
    user: {
      auth: function(authService){
        return authService.authorizeRole('user');
      }
    },
    tpr: {
      auth: function(authService){
        return authService.authorizeRole('tpr');
      }
    }
  }

  $routeProvider
    .when('/', {
      templateUrl: 'partials/login',
      controller: 'authCtrl'
    })
    .when('/home', {
      templateUrl: 'partials/home',
      controller: 'homeCtrl'
    })
    .when('/users',{
      templateUrl: 'partials/users',
      controller: 'usersCtrl',
      resolve: routeCheck.admin
    })
    .otherwise({redirectTo: '/'})
});
