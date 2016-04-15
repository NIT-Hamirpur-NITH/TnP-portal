app.controller('inviteCtrl', function($scope, $location, $route, inviteService){

  $scope.inviteSent = $route.current.locals.inviteSent;

  $scope.inviteAll = function(){
    inviteService.inviteAll().
    then (function(data){
      $scope.inviteSent = data;
    },function(status){
      console.log(status);
    });
  }
});
