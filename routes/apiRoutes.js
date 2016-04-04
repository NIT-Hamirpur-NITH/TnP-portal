var express = require('express');
var router = express.Router();
var auth = require('../api/auth/auth');
var user = require('../api/userCtrl');
var company = require('../api/companyCtrl');
var roles = require('../api/auth/roles');

/*
*AUTHENTICATION ROUTES
*/
router.post('/login', auth.alreadyLoggedIn, auth.loginAuthenticate);
router.post('/register', auth.alreadyLoggedIn, auth.signupAuthenticate);
router.post('/logout', auth.logout);

/*
/USER ROUTES
*/
router.get('/appliedFor', auth.isLoggedIn, user.appliedFor);
router.get('/placedIn', auth.isLoggedIn, user.placedIn);

/*
*ROUTES RELATED TO COMPANY
*/
router.post('/company/add', auth.isLoggedIn, roles.isAuthorized, company.addCompany);
router.post('/company/edit', auth.isLoggedIn, roles.isAuthorized, company.editCompany);
router.get('/company/all', auth.isLoggedIn, user.listAll);
router.get('/company/canApply', auth.isLoggedIn, user.canApply);

/*
*TPR ROUTES
*/

/*
*ADMIN ROUTES
*/
module.exports = router;
