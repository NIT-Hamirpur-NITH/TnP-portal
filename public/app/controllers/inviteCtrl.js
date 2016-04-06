app.controller('inviteCtrl', function($scope, $location, inviteService){

  inviteService.getDatabase().
  then (function(data){
    $scope.database = data;
    console.log(data);
  },function(status){
    console.log(status);
  });

  $scope.sendInvite = function(){
    inviteService.sendInvite().
    then (function(data){
      console.log(data);
      $location.path('/home');
    },function(status){
      console.log(status);
    });
  }
});
