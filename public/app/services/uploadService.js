app.factory('uploadService', function($http, $q){
  return {
    upload: function(file){
      var deferred = $q.defer();
      var fd = new FormData();
      fd.append('file', file);
      $http({
        method: 'POST',
        url: '/api/uploadDb',
        data: fd,
        headers: {'Content-Type': undefined}
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
