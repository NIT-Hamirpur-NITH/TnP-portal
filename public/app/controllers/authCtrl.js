app.controller('authCtrl', function($scope, $window, $location, authService, identityService){

  if(identityService.isAuthenticated()){
    $scope.user = identityService;
    $location.path('/home');
  }

  $scope.signIn = function(username, password){
    authService.loginUser(username, password).
    then (function(data){
      if(identityService.isAuthenticated()){
        $window.location.href = '/home';    //A full page reload required so that the set cookie is accessible everywhere
      }else{
        $location.path('/');
      }
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
