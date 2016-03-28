app.controller('homeCtrl', function($scope, identityService){
  if(identityService.isAuthenticated()){
    $scope.user = identityService;
  }
});
