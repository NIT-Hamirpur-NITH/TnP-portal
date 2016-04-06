app.controller('inviteCtrl', function($scope, $location, inviteService){

  inviteService.getDatabase().
  then (function(data){
    $scope.database = data;
  },function(status){
    console.log(status);
  });

  $scope.inviteAll = function(){
    inviteService.inviteAll().
    then (function(data){
      // $scope.database = data.user;
      $location.path('/home');
    },function(status){
      console.log(status);
    });
  }
});
