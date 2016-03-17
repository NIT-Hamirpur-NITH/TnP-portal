var express = require('express');
var router = express.Router();
var auth = require('../api/auth/auth');

router.post('/login', auth.alreadyLoggedIn, auth.loginAuthenticate);
router.post('/logout', auth.logout);

module.exports = router;
