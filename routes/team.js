var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({title:'Nosso time'});
});

router.get('/places', function(req, res, next) {
  res.json([{title:'Restaurantes', image:'restaurante'}, {title:'Pet Shops', image:'petshop'}, {title:'Vidraçarias', image:'vidracaria'}, {title:'Marcenarias', image:'marcenaria'}]);
});

router.get('/professionals', function(req, res, next) {
  res.json(['Tradutores', 'Técnicos de computadores', 'Eletricistas', 'Padeiros']);
});

module.exports = router;
