app.controller('companyCtrl', function($scope, $window, $route, $location, companyService, identityService){

  $scope.identity = identityService;

  $scope.addCompany = function(){
    var newCompany = {
      name : $scope.cname,
      package : $scope.cpackage,
      deadline : $scope.cdeadline,
      branches : $scope.cbranch,
      date : $scope.cdate,
      btech : $scope.btech,
      tenth : $scope.tenth,
      twelfth : $scope.twelfth,
      description : $scope.cdescription,
      process : $scope.cprocess
    }

    companyService.add(newCompany).
    then (function(data){
      $location.path('/');
    }, function(status){
      console.log(status);
    });
  }

  $scope.deleteCompany = function(id){
    companyService.delete(id).
    then (function(data){
      $scope.companies = data;
    }, function(status){
      console.log(status);
    });
  }

  $scope.companies = $route.current.locals.companies;
  $scope.posted = $route.current.locals.posted;

});
