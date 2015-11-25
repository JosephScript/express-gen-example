var express = require('express');
var router = express.Router();
var kittehs = require('../data/kittehs.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  // renders the file named "index.jade" along with the data
  res.render('index', {title: 'Express', kittehs: kittehs});
});

// exports the router
module.exports = router;
