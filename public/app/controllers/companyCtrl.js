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

  $scope.apply = function(id){
    companyService.apply(id).
    then (function(data){
      /*
      * Filetering companies on the basis of user eligibility and setting them into canApply
      */
      var companies_canapply = data.companies;
      var companiesArr = [];
      var user = data.user;
      for(i = 0; i < companies_canapply.length; i++){
          var company = companies_canapply[i];
          if((company.branches.indexOf(user.branch)>-1) && (company.eligibility.tenth <= user.tenth) && (company.eligibility.twelfth <= user.twelfth) && (company.eligibility.btech <= user.btech)){
            companiesArr.push(company);
          }
        }
      var companiesJSON = {
        "companies":companiesArr
      };
      $scope.canApply = companiesJSON;
      $scope.companies = data;
    }, function(status){
      console.log(status);
    });
  }

  $scope.companies = $route.current.locals.companies;
  $scope.posted = $route.current.locals.posted;
  $scope.canApply = $route.current.locals.canApply;

});
