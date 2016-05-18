var express = require('express');
var router = express.Router();
var auth = require('../api/auth/auth');
var user = require('../api/userCtrl');
var tpr = require('../api/tprCtrl');
var admin = require('../api/adminCtrl');
var common = require('../api/commonCtrl');
var roles = require('../api/auth/roles');

/*
*AUTHENTICATION ROUTES
*/
router.post('/login', auth.alreadyLoggedIn, auth.loginAuthenticate);
router.post('/logout', auth.logout);

/*
/USER ROUTES
*/
router.get('/company/appliedFor', auth.isLoggedIn, roles.isUser, user.appliedFor);
router.get('/placedIn', auth.isLoggedIn, roles.isUser, user.placedIn);
router.get('/canApply', auth.isLoggedIn, roles.isUser, user.canApply);
router.post('/apply/:companyid', auth.isLoggedIn, roles.isUser, user.apply);
router.get('/placed/all', auth.isLoggedIn, common.placed);

/*
*ROUTES RELATED TO COMPANY
*/
router.get('/company/visited', auth.isLoggedIn, common.companies);
router.get('/company/posted', auth.isLoggedIn, roles.isAuthorized, common.posted);
router.post('/company/add', auth.isLoggedIn, roles.isAuthorized, common.addCompany);
router.post('/company/edit', auth.isLoggedIn, roles.isAuthorized, common.editCompany);
router.delete('/company/delete/:id', auth.isLoggedIn, roles.isAuthorized, common.deleteCompany);
router.get('/company/canApply', auth.isLoggedIn, roles.isUser, user.canApply);
router.get('/company/applied/all', auth.isLoggedIn, roles.isTpr, tpr.getUsers);
router.get('/download/:filename', auth.isLoggedIn, roles.isAuthorized, common.download);

/*
*TPR ROUTES
*/
router.post('/invite', auth.isLoggedIn, roles.isTpr, tpr.ifBranch, tpr.inviteAll);
router.get('/inviteSent', auth.isLoggedIn, roles.isTpr, tpr.ifBranch, tpr.inviteSent);
router.get('/database', auth.isLoggedIn, roles.isTpr, tpr.getDatabase);
router.get('/ifDb', auth.isLoggedIn, roles.isTpr, tpr.ifDb);
router.post('/uploadDb', auth.isLoggedIn, roles.isTpr, tpr.uploadDatabase);
router.post('/addDb', auth.isLoggedIn, roles.isTpr, tpr.addDatabase);
router.post('/ifAddedToDb', auth.isLoggedIn, roles.isTpr, tpr.getDatabase);
router.post('/addplacement/:user_id/:company_id', auth.isLoggedIn, roles.isTpr, tpr.addPlacement);
/*
*ADMIN ROUTES
*/
router.post('/admin/addtpr', auth.isLoggedIn, roles.isAdmin, auth.signupAuthenticate);
router.get('/database/:branch', auth.isLoggedIn, roles.isAdmin, admin.getDatabase);
/*
*COMMON ROUTES
*/
router.get('/tpr/all', auth.isLoggedIn, roles.isAuthorized, common.listTpr);

router.get('*', function(req, res){
  res.redirect('/');
})
module.exports = router;
