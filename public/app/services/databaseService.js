app.factory('databaseService', function($http, $q){
  return {
    getDatabase : function(){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/database',
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
