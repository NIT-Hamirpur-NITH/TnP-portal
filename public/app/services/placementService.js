app.factory('placementService', function($http, $q){
  return {
    getUsers : function(company){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/company/applied/all'
      })
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(status){
        deferred.reject(status);
      });
      return deferred.promise;
    },

    addPlacement : function(user, company){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: '/api/addplacement/'+user+'/'+company,
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
