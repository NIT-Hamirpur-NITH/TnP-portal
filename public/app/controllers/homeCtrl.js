app.controller('homeCtrl', function($scope, userIdentity){
  if(userIdentity.isAuthenticated()){
    $scope.user = userIdentity;
  }
});
