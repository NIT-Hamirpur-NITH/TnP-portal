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
    },

    role : function(){
      if(!!this.isAuthenticated()){
        currentUser = JSON.parse($cookies.get('userCookie'));
        if(currentUser.roles.indexOf("admin") > -1){
          return "admin";
        }else if(currentUser.roles.indexOf("tpr") > -1){
          return "tpr";
        }else if(currentUser.roles.indexOf("user") > -1){
          return "user";
        }else{
          return undefined;
        }
      }
    }
  }
});
