app.factory('authService', function($http, $q, identityService, $cookies){
  return {
    loginUser : function(username, password){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: '/api/login',
        data: {
          username:username,
          password:password
        }
      })
      .success(function(data){
        var putData = JSON.stringify(data.user);    //JSON.stringify converting the response into a string
        $cookies.put('userCookie', putData);    //Cookie stores data as string
        identityService.currentUser = $cookies.get('userCookie');
        deferred.resolve(data);
      })
      .error(function(status){
        deferred.reject(status);
      });
      return deferred.promise;
    },

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

    logoutUser : function(){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: '/api/logout'
      })
      .success(function(data){
        $cookies.remove('userCookie');
        identityService.currentUser = undefined;
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
    },

    authorize: function(){
      if(identityService.isAuthenticated()){
        return true;
      }else{
        return $q.reject('noAuth');
      }
    },

    noAuthorize: function(){
      if(!(identityService.isAuthenticated())){
        return true;
      }else{
        return $q.reject('noAuth');
      }
    },

    authAdminTpr: function(){
      if(!(identityService.isAuthorized("user"))){
        return true;
      }else{
        return $q.reject('noAuth');
      }
    },
  }
});
