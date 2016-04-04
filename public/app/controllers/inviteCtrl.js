app.controller('inviteCtrl', function($scope, $location, inviteService){
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
