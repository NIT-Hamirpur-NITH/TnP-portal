var app = angular.module('tnp',['ngResource', 'ngRoute', 'ngCookies', 'ngMaterial']);

app.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'noAuth') {
          $location.path('/home');
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
  },
  adminTpr:{
    auth:function(authService){
      return authService.authAdminTpr();
    },
    database:function(databaseService){
      return (databaseService.getDatabase().
      then (function(data){
        return data;
      },function(status){
        console.log(status);
      }))
    }
  }
}

app.config(function($routeProvider, $locationProvider){

  $locationProvider.html5Mode({ enabled: true, requireBase: false });

  $routeProvider
    .when('/', {
      templateUrl: 'partials/login.html',
      controller: 'authCtrl',
      resolve: routeCheck.noUser
    })
    .when('/home', {
      templateUrl: 'partials/home.html',
      controller: 'homeCtrl',
      resolve: routeCheck.user
    })
    .when('/addtpr',{
      templateUrl: 'partials/addtpr.html',
      controller: 'authCtrl',
      resolve: routeCheck.admin
    })
    .when('/invite',{
      templateUrl: 'partials/invite.html',
      controller: 'inviteCtrl',
      resolve: routeCheck.tpr
    })
    .when('/database',{
      templateUrl: 'partials/database.html',
      controller: 'databaseCtrl',
      resolve: routeCheck.adminTpr
    })
    .otherwise({redirectTo: '/'})
});
