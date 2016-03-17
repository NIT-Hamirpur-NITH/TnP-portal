app.factory('logout', function($http, $q){
  return {
    getResponse : function(){
      var deferred = $q.defer();
      $http({method: 'POST', url: '/api/logout'})
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
