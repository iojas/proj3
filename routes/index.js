var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/index', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/apply', function(req, res, next) {
    res.render('apply');
});

router.get('/maliSamaj', function(req, res, next) {
    res.render('maliSamaj');
});

router.get('/About', function(req, res, next) {
  res.render('About', { title: 'Express' });
});


module.exports = router;
