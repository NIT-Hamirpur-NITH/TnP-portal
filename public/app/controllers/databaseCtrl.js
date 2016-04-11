app.controller('databaseCtrl', function($scope, $location, databaseService){

  databaseService.getDatabase().
  then (function(data){
    $scope.database = data;
  },function(status){
    console.log(status);
  });
});
