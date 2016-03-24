app.factory('login', function($http, $q){
  return {
    getResponse : function(username, password){
      var deferred = $q.defer();
      $http({method: 'POST', data: {username:username, password:password}, url: '/api/login'})
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
