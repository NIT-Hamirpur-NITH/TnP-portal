var express = require('express');
var router = express.Router();
var auth = require('../api/auth/auth');
var user = require('../api/user/userController');
var tpr = require('../api/company/tprController');

router.post('/login', auth.alreadyLoggedIn, auth.loginAuthenticate);
router.post('/logout', auth.logout);
router.get('/appliedFor', auth.isLoggedIn, user.appliedFor);
router.get('/placedIn', auth.isLoggedIn, user.placedIn);
router.post('/company/add',auth.isLoggedIn,tpr.addCompany);
router.post('/company/edit',auth.isLoggedIn,tpr.editCompany);

module.exports = router;
