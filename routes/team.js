var express = require('express');
var db = require('db');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({title:'Nosso time'});
});

router.get('/places', function(req, res, next) {
  categorias = new db();
  res.json(categorias.categoriaEmpresas);
});

router.get('/places/restaurantes', function(req, res, next) {
  rest = new db();
  res.json(rest.restaurantes);
});

router.get('/profissionais', function(req, res, next) {
  prof = new db();
  res.json(prof.categoriaProfissionais);
});

router.get('/profissionais/categoria', function(req, res, next) {
  prof = new db();
  prof.categoria(req.query.tipo);
  res.json(prof.profissionais);
});

module.exports = router;
