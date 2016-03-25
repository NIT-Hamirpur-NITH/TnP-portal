app.factory('auth', function($http, $q, userIdentity){
  return {
    loginUser : function(username, password){
      var deferred = $q.defer();
      $http({method: 'POST', data: {username:username, password:password}, url: '/api/login'})
      .success(function(data){
        userIdentity.user = data;
        deferred.resolve(data);
      })
      .error(function(status){
        deferred.reject(status);
      });
      return deferred.promise;
    },

    logoutUser : function(){
      var deferred = $q.defer();
      $http({method: 'POST', url: '/api/logout'})
      .success(function(data){
        userIdentity.user = undefined;
        deferred.resolve(data);
      })
      .error(function(status){
        deferred.reject(status);
      });
      return deferred.promise;
    }
  }
});
