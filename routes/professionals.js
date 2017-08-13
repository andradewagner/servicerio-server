var express = require('express');
var db = require('db');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.end();
});

router.get('/categoria', function(req, res, next) {
  console.log('Tipo da categoria: ' + req.query.tipo);
  res.end();
});

module.exports = router;
