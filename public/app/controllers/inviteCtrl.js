app.controller('inviteCtrl', function($scope, $location, inviteService){

  $scope.inviteAll = function(){
    inviteService.inviteAll().
    then (function(data){
      // $scope.database = data.user;
    },function(status){
      console.log(status);
    });
  }
});
