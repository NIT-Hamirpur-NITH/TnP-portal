var app = angular.module('tnp',['ngResource', 'ngRoute', 'ngCookies']);

app.config(function($routeProvider, $locationProvider){

  $locationProvider.html5Mode({ enabled: true, requireBase: false });

  $routeProvider
    .when('/', {
      templateUrl: 'partials/login',
      controller: 'authCtrl'
    })
    .when('/home', {
      templateUrl: 'partials/home',
      controller: 'homeCtrl'
    })
    .otherwise({redirectTo: '/'})
});
