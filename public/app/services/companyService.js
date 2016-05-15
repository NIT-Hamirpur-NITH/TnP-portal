app.factory('companyService', function($http, $q){
  return {
    add : function(company){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: '/api/company/add',
        data: company
      })
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(status){
        deferred.reject(status);
      });
      return deferred.promise;
    },

    companies : function(){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/company/visited'
      })
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(status){
        deferred.reject(status);
      });
      return deferred.promise;
    }
  }
});
