app.controller('uploadCtrl', function($scope, $location, $route, uploadService, databaseService){

  $scope.ifDb = $route.current.locals.ifDb;
  $scope.added = $route.current.locals.added;

  $scope.adddb = function(){
    databaseService.adddb()
    .then (function(data){
      $scope.added = data;
    },function(status){
      console.log(status);
    })
  }

  $scope.upload = function(){
    var file = $scope.file;
    uploadService.upload(file).
    then (function(data){
      $scope.ifDb = data;
    }, function(status){
      console.log(status);
    });
  }
});
