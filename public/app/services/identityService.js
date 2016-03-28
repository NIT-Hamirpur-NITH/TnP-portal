app.factory('identityService', function($cookies){

  if($cookies.get('userCookie')){
    var retUser = JSON.parse($cookies.get('userCookie'));
  }else{
    var retUser = undefined;
  }

  return {
      authUser : retUser,
      isAuthenticated : function(){
        return !!this.authUser;
      },
      isAuthorized : function(role){
        return (!!this.authUser && (!!this.authUser.roles.indexOf(role) > -1));
      }
  }
});
