app.controller('tprCtrl', function($scope, $window, $route, $location, tprService, identityService){

  $scope.addtpr = function(){
    var newUser = {
      username : $scope.username,
      name : $scope.name,
      branch : $scope.branch,
      email : $scope.email,
      contact : $scope.contact,
      password : $scope.password
    }

    tprService.createUser(newUser).
    then (function(data){
      $location.path('/');
    }, function(status){
      console.log(status);
    });
  }

  $scope.tpr = $route.current.locals.tpr;
});
