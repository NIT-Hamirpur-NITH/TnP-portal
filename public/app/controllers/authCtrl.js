app.controller('authCtrl', function($scope, $window, $location, authService, identityService){

  $scope.identity = identityService;
  if(identityService.isAuthenticated())
    $scope.currentUser = JSON.parse(identityService.currentUser);

  $scope.signIn = function(username, password){
    authService.loginUser(username, password).
    then (function(data){
      $location.path('/home');
    },function(status){
      console.log(status);
    });
  }

  $scope.signOut = function(){
    authService.logoutUser().
    then (function(data){
      $scope.username = "";
      $scope.password = "";
      $location.path('/');
    },function(status){
      console.log(status);
    });
  }
});
