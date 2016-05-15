app.factory('tprService', function($http, $q){
  return {
    createUser : function(newUser) {
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: '/api/admin/addtpr',
        data: newUser
      })
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(status){
        deferred.reject(status);
      });
      return deferred.promise;
    },

    listTpr : function(newUser) {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/tpr/all'
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
