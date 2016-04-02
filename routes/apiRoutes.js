var express = require('express');
var router = express.Router();
var auth = require('../api/auth/auth');
var appliedFor = require('../api/appliedFor');
var placedIn = require('../api/placedIn');

router.post('/login', auth.alreadyLoggedIn, auth.loginAuthenticate);
router.post('/logout', auth.logout);
router.get('/appliedfor', auth.isLoggedIn, appliedFor.appliedFor);
router.get('/placedIn', auth.isLoggedIn, placedIn.placedIn);

module.exports = router;
