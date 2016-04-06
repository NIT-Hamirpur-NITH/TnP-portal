app.factory('inviteService', function($http, $q, identityService, $cookies){
  return {
    inviteAll : function(){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: '/api/invite',
      })
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(status){
        deferred.reject(status);
      });
      return deferred.promise;
    },

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
