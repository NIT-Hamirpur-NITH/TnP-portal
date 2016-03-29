var app = angular.module('tnp',['ngResource', 'ngRoute', 'ngCookies']);

app.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'noAuth') {
          $location.path('/home');
        }else{
          console.log('Authenticated.');
        }
    });
});

var routeCheck = {
  noUser: {
    auth: function($q, authService){
      return authService.noAuthorize();
    }
  },
  user: {
    auth: function(authService){
      return authService.authorize();
    }
  },
  admin: {
    auth: function(authService){
      return authService.authorizeRole('admin');
    }
  },
  tpr: {
    auth: function(authService){
      return authService.authorizeRole('tpr');
    }
  }
}

app.config(function($routeProvider, $locationProvider){

  $locationProvider.html5Mode({ enabled: true, requireBase: false });

  $routeProvider
    .when('/', {
      templateUrl: 'partials/login',
      controller: 'authCtrl',
      resolve: routeCheck.noUser
    })
    .when('/home', {
      templateUrl: 'partials/home',
      controller: 'homeCtrl',
      resolve: routeCheck.user
    })
    .when('/users',{
      templateUrl: 'partials/users',
      controller: 'usersCtrl',
      resolve: routeCheck.admin
    })
    .otherwise({redirectTo: '/'})
});
