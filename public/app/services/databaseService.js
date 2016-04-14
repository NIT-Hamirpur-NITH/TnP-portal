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
    },

    getDbByBranch : function(branch){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/database/' + branch
      })
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(status){
        deferred.reject(status);
      });
      return deferred.promise;
    },

    ifDb : function(){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/ifDb'
      })
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(status){
        deferred.reject(status);
      });
      return deferred.promise;
    },

    ifAddedToDb : function(){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: '/api/ifAddedToDb'
      })
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(status){
        deferred.reject(status);
      });
      return deferred.promise;
    },

    adddb : function(){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: '/api/addDb'
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
