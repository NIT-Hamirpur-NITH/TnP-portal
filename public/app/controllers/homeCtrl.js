app.controller('homeCtrl', function($scope, identityService){
  $scope.user = identityService;
});
