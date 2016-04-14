app.controller('uploadCtrl', function($scope, $location, uploadService){
  $scope.upload = function(){
    var file = $scope.file;
    uploadService.upload(file).
    then (function(data){
      $location.path('/');
    }, function(status){
      console.log(status);
    });
  }
});
