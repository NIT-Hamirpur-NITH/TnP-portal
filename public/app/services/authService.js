app.factory('authService', function($http, $q, identityService, $cookies){
  return {
    loginUser : function(username, password){
      var deferred = $q.defer();
      $http({method: 'POST', data: {username:username, password:password}, url: '/api/login'})
      .success(function(data){
        var putData = JSON.stringify(data.user);    //JSON.stringify converting the response into a string
        $cookies.put('userCookie', putData);    //Cookie stores data as string
        identityService.authUser = $cookies.get('userCookie');
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
        $cookies.remove('userCookie');
        identityService.authUser = undefined;
        deferred.resolve(data);
      })
      .error(function(status){
        deferred.reject(status);
      });
      return deferred.promise;
    },

    authorizeRole: function(role){
      if(identityService.isAuthorized(role)){
        return true;
      }else{
        return $q.reject('noAuth');
      }
    }
  }
});
