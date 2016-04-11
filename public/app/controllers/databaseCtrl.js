app.controller('databaseCtrl', function($scope, $location, databaseService, identityService){

  $scope.identity = identityService;
  
  databaseService.getDatabase().
  then (function(data){
    $scope.database = data;
  },function(status){
    console.log(status);
  });
});
