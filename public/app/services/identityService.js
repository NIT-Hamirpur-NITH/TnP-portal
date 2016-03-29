app.factory('identityService', function($cookies){

  var currentUser = $cookies.get('userCookie');

  return {
    currentUser : currentUser,
    isAuthenticated : function(){
      return !!this.currentUser;
    },
    isAuthorized : function(role){
      if(!!this.isAuthenticated()){
        currentUser = JSON.parse($cookies.get('userCookie'));
        return (currentUser && (currentUser.roles.indexOf(role) > -1));
      }else{
        return undefined;
      }
    }
  }
});
