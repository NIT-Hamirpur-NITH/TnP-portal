app.controller('logoutCtrl', function($scope, logout){
  /*
  * Fetching data from the API which returns a promise. Use .then to access the data.
  */
  var dataPromise = logout.getResponse().
  then (function(data){
    $scope.response = data;
  },function(status){
    console.log(status);
  });
});
