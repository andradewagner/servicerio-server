var express = require('express');
var db = require('db');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({title:'Nosso time'});
});

router.get('/places', function(req, res, next) {
  res.json([{title:'Restaurantes', image:'restaurante', link: 'restaurantes'}, {title:'Pet Shops', image:'petshop', link: 'petshops'}, {title:'Vidraçarias', image:'vidracaria', link: 'vidracarias'}, {title:'Marcenarias', image:'marcenaria', link: 'marcenarias'}]);
});

router.get('/places/restaurantes', function(req, res, next) {
  rest = new db();
  res.json(rest.restaurantes);
});

router.get('/professionals', function(req, res, next) {
  res.json(['Tradutores', 'Técnicos de computadores', 'Eletricistas', 'Padeiros']);
});

module.exports = router;
