app.controller('placementCtrl', function($scope, $window, $route, $location, placementService, identityService){

  $scope.users = $route.current.locals.users;
  res = $route.current.locals.users;
  var stuApp = [];
  for(i=0;i<res.users.length;i++){
    var user = res.users[i];
    for(j=0;j<user.appliedFor.length;j++){
      var com_id = user.appliedFor[j];
      for(k=0;k<res.companies.length;k++){
        var com = res.companies[k];
        if(com_id === com._id){
          var user_company = {
            'name':user.name,
            'username':user.username,
            'branch':user.branch,
            'company':com.name,
            'status':false
          }
          stuApp.push(user_company);
        }
      }
    }
  }
  $scope.applied = stuApp;
});
