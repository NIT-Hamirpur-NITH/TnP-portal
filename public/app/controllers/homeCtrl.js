app.controller('homeCtrl', function($scope, identityService){
  $scope.currentUser = JSON.parse(identityService.currentUser);
  $scope.identity = identityService;
});
