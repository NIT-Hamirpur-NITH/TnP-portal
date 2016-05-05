app.factory('inviteService', function($http, $q){
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

    inviteSent : function(){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/inviteSent'
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
