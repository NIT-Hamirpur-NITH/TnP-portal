app.controller('companyCtrl', function($scope, $window, $route, $location, companyService){

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

  // $scope.companies = $route.current.locals.companies;
  $scope.companies = $route.current.locals.companies;

});
