app.controller('logoutCtrl', function($scope, logout){

  var dataPromise = logout.getResponse().
  then (function(data){
    $scope.response = data;
  },function(status){
    console.log(status);
  });
});
