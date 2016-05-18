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
    auth: function(authService){
      return authService.noAuthorize();
    }
  },

  user: {
    auth: function(authService){
      return authService.authorize();
    },
    companies: function(companyService){
      return (companyService.companies()
      .then (function(data){
        return data;
      },function(status){
        console.log(status);
      }))
    },
    canApply: function(companyService){
      return (companyService.canApply()
      .then (function(data){
        return data;
      },function(status){
        console.log(status);
      }))
    },
    applied: function(companyService){
      return (companyService.appliedFor()
      .then (function(data){
        return data;
      },function(status){
        console.log(status);
      }))
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
    inviteSent: function(inviteService){
      return (inviteService.inviteSent()
      .then (function(data){
        return data;
      },function(status){
        console.log(status);
      }))
    },
    users: function(placementService){
      return (placementService.getUsers()
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
    },
    posted: function(companyService){
      return (companyService.posted()
      .then (function(data){
        return data;
      },function(status){
        console.log(status);
      }))
    },
    tpr: function(tprService){
      return (tprService.listTpr()
      .then (function(data){
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
      controller: 'tprCtrl',
      resolve: {
        "auth": routeCheck.admin.auth
      }
    })
    .when('/tpr',{
      templateUrl: '/partials/tpr.html',
      controller: 'tprCtrl',
      resolve:  {
        "auth": routeCheck.adminTpr.auth,
        "tpr": routeCheck.adminTpr.tpr
      }
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
    .when('/company/add',{
      templateUrl: '/partials/addCompany.html',
      controller: 'companyCtrl',
      resolve: {
        "auth": routeCheck.adminTpr.auth
      }
    })
    .when('/company/visited',{
      templateUrl: '/partials/companies.html',
      controller: 'companyCtrl',
      resolve: {
        "auth": routeCheck.user.auth,
        "companies": routeCheck.user.companies
      }
    })
    .when('/company/posted',{
      templateUrl: '/partials/posted.html',
      controller: 'companyCtrl',
      resolve: {
        "auth": routeCheck.adminTpr.auth,
        "posted": routeCheck.adminTpr.posted
      }
    })
    .when('/company/canapply',{
      templateUrl: '/partials/canapply.html',
      controller: 'companyCtrl',
      resolve: {
        "auth": routeCheck.user.auth,
        "canApply": routeCheck.user.canApply
      }
    })
    .when('/company/applied',{
      templateUrl: '/partials/applied.html',
      controller: 'companyCtrl',
      resolve: {
        "auth": routeCheck.user.auth,
        "applied": routeCheck.user.applied
      }
    })
    .when('/placement/add',{
      templateUrl: '/partials/addplacement.html',
      controller: 'placementCtrl',
      resolve: {
        "auth": routeCheck.tpr.auth,
        "users": routeCheck.tpr.users
      }
    })
    .otherwise({redirectTo: '/'})
});
