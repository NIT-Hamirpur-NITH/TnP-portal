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
    },
    database: function(databaseService, $route){
      return (databaseService.getDbByBranch($route.current.params.branch)
      .then (function(data){
        return data;
      },function(status){
        console.log(status);
      }))
    }
  },

  tpr: {
    auth: function(authService){
      return authService.authorizeRole('tpr');
    },
    ifDb: function(databaseService){
      return (databaseService.ifDb()
      .then (function(data){
        return data;
      },function(status){
        console.log(status);
      }))
    },
    ifAddedToDb: function(databaseService){
      return (databaseService.ifAddedToDb()
        .then (function(data){
          return data;
        },function(status){
          console.log(status);
        }))
      },
    database: function(databaseService){
      return (databaseService.getDatabase()
      .then (function(data){
        return data;
      },function(status){
        console.log(status);
      }))
    },
    inviteSent: function(databaseService){
      return (databaseService.inviteSent()
      .then (function(data){
        return data;
      },function(status){
        console.log(status);
      }))
    }
  },

  adminTpr:{
    auth:function(authService){
      return authService.authAdminTpr();
    }
  }
}

app.config(function($routeProvider, $locationProvider){

  $locationProvider.html5Mode({ enabled: true, requireBase: false });

  $routeProvider
    .when('/', {
      templateUrl: '/partials/login.html',
      controller: 'authCtrl',
      resolve: routeCheck.noUser
    })
    .when('/home', {
      templateUrl: '/partials/home.html',
      controller: 'homeCtrl',
      resolve: routeCheck.user
    })
    .when('/addtpr',{
      templateUrl: '/partials/addtpr.html',
      controller: 'authCtrl',
      resolve: routeCheck.admin
    })
    .when('/upload',{
      templateUrl: '/partials/upload.html',
      controller: 'uploadCtrl',
      resolve: {
        "auth":routeCheck.tpr.auth,
        "ifDb":routeCheck.tpr.ifDb,
        "added":routeCheck.tpr.ifAddedToDb
      }
    })
    .when('/invite',{
      templateUrl: '/partials/invite.html',
      controller: 'inviteCtrl',
      resolve: {
        "auth": routeCheck.tpr.auth,
        "inviteSent": routeCheck.tpr.inviteSent
      }
    })
    .when('/database',{
      templateUrl: '/partials/database.html',
      controller: 'databaseCtrl',
      resolve: routeCheck.tpr
    })
    .when('/database/:branch',{
      templateUrl: '/partials/database.html',
      controller: 'databaseCtrl',
      resolve: routeCheck.admin
    })
    .otherwise({redirectTo: '/'})
});
