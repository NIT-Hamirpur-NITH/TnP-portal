var express = require('express');
var router = express.Router();
var auth = require('../api/auth/auth');
var user = require('../api/userCtrl');
var tpr = require('../api/tprCtrl');
var roles = require('../api/auth/roles');

/*
*AUTHENTICATION ROUTES
*/
router.post('/login', auth.alreadyLoggedIn, auth.loginAuthenticate);
router.post('/logout', auth.logout);

/*
/USER ROUTES
*/
router.get('/appliedFor', auth.isLoggedIn, user.appliedFor);
router.get('/placedIn', auth.isLoggedIn, user.placedIn);

/*
*ROUTES RELATED TO COMPANY
*/
router.post('/company/add', auth.isLoggedIn, roles.isAuthorized, tpr.addCompany);
router.post('/company/edit', auth.isLoggedIn, roles.isAuthorized, tpr.editCompany);
router.get('/company/all', auth.isLoggedIn, user.listAll);
router.get('/company/canApply', auth.isLoggedIn, user.canApply);

/*
*TPR ROUTES
*/
router.post('/invite', auth.isLoggedIn, roles.isTpr, tpr.inviteAll);
router.get('/database', auth.isLoggedIn, roles.isTpr, tpr.getDatabase);
router.get('*', function(req, res){
  res.redirect('/');
})
/*
*ADMIN ROUTES
*/
router.post('/addtpr', auth.isLoggedIn, roles.isAdmin, auth.signupAuthenticate);

module.exports = router;
