app.controller('authCtrl', function($scope, $location, auth, userIdentity){
  $scope.user = userIdentity;
  $scope.signIn = function(username, password){
    auth.loginUser(username, password).
    then (function(data){
      $location.path('/');
    },function(status){
      console.log(status);
    });
  }

  $scope.signOut = function(){
    auth.logoutUser().
    then (function(data){
      $scope.username = "";
      $scope.password = "";
      $location.path('/');
    },function(status){
      console.log(status);
    });
  }
});
