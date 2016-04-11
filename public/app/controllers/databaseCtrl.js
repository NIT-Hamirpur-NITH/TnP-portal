app.controller('databaseCtrl', function($scope, $location, databaseService, identityService){

  $scope.identity = identityService;
  databaseService.getDatabase().
  then (function(data){
    $scope.database = data;
    $scope.db = data.db;
  },function(status){
    console.log(status);
  });
});
