app.controller('authCtrl', function($scope,$window, $location, auth, userIdentity){

  if(userIdentity.isAuthenticated()){
    $scope.user = userIdentity;
    $location.path('/home');
  }

  $scope.signIn = function(username, password){
    auth.loginUser(username, password).
    then (function(data){
      if(userIdentity.isAuthenticated()){
        $window.location.href = '/home';    //A full page reload required so that the set cookie is accessible everywhere
      }else{
        $location.path('/');
      }
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
