app.controller('uploadCtrl', function($scope, $location, $route, uploadService){

  $scope.ifDb = $route.current.locals.ifDb;
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
