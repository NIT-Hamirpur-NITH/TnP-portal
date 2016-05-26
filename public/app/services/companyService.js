app.factory('companyService', function($http, $q, $routeParams){
  return {
    add : function(company){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: '/api/company/add',
        data: company
      })
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(status){
        deferred.reject(status);
      });
      return deferred.promise;
    },

    delete : function(id){
      var deferred = $q.defer();
      $http({
        method: 'DELETE',
        url: '/api/company/delete/'+id
      })
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(status){
        deferred.reject(status);
      });
      return deferred.promise;
    },

    downloadRes : function(name){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/download/'+name
      })
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(status){
        deferred.reject(status);
      });
      return deferred.promise;
    },

    companies : function(){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/company/visited'
      })
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(status){
        deferred.reject(status);
      });
      return deferred.promise;
    },

    posted : function(){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/company/posted'
      })
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(status){
        deferred.reject(status);
      });
      return deferred.promise;
    },

    canApply : function(){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/company/canApply'
      })
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(status){
        deferred.reject(status);
      });
      return deferred.promise;
    },

    apply : function(id){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: '/api/apply/'+id
      })
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(status){
        deferred.reject(status);
      });
      return deferred.promise;
    },

    appliedFor : function(){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/company/appliedFor'
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
