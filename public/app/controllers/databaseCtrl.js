app.controller('databaseCtrl', function($scope, $route){
  $scope.database = $route.current.locals.database;
});
