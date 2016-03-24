app.controller('loginCtrl', function($scope, login){

  $scope.signIn = function(username, password){
    login.getResponse(username, password).
    then (function(data){
      $scope.response = data;
      console.log(data);
    },function(status){
      console.log(status);
    });
  }
});
