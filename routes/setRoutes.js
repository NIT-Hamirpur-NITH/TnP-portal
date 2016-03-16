var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'TNP' });
});

router.get('/partials/*', function(req, res) {
  res.render('partials/' + req.params[0]);
});

module.exports = router;
