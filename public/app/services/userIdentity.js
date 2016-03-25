app.factory('userIdentity', function(){
  return {
      user : undefined,
      isAuthenticated : function(){
        return !!this.user;
      }
  }
});
