app.controller('placementCtrl', function($scope, $window, $route, $location, placementService, identityService){

  $scope.placedin = $route.current.locals.placedin;

  if($route.current.locals.users){
    var res = $route.current.locals.users;
    var stuApp = [];
    if(res.users){
      for(i=0;i<res.users.length;i++){
        var user = res.users[i];
        for(j=0;j<user.appliedFor.length;j++){
          var com_id = user.appliedFor[j];
          for(k=0;k<res.companies.length;k++){
            var com = res.companies[k];
            if(com_id === com._id){
              if(user.placedIn.indexOf(com_id)>-1){
                var user_company = {
                  'user_id':user._id,
                  'name':user.name,
                  'username':user.username,
                  'branch':user.branch,
                  'company':com.name,
                  'company_id':com._id,
                  'status':false,
                  'placed':true
                }
              }else{
                var user_company = {
                  'user_id':user._id,
                  'name':user.name,
                  'username':user.username,
                  'branch':user.branch,
                  'company':com.name,
                  'company_id':com._id,
                  'status':false,
                  'placed':false
                }
              }
              stuApp.push(user_company);
            }
          }
        }
      }
    }
    $scope.applied = stuApp;
  }

  if($route.current.locals.placed){
    var res = $route.current.locals.placed;
    var stuApp = [];
    if(res.users){
        for(i=0;i<res.users.length;i++){
        var user = res.users[i];
        for(j=0;j<user.placedIn.length;j++){
          var com_id = user.placedIn[j];
          for(k=0;k<res.companies.length;k++){
            var com = res.companies[k];
            if(com_id === com._id){
              var user_company = {
                'user_id':user._id,
                'name':user.name,
                'username':user.username,
                'branch':user.branch,
                'company':com.name,
                'package':com.package,
                'company_id':com._id,
                'status':false
              }
              stuApp.push(user_company);
            }
          }
        }
      }
    }
    $scope.placed = stuApp;
  }

  $scope.addplacement = function(user_id, company_id){
    placementService.addPlacement(user_id, company_id).
    then (function(data){
      for(i=0;i<$scope.applied.length;i++){
        var user = $scope.applied[i];
        if((user.company_id === data.company) && (user.user_id === data.user)){
          user.placed = true;
        }
      }
      console.log($scope.applied);
    }, function(status){
      console.log(status);
    });
  }
});
