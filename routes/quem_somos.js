var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({title:'Um catálogo online com uma variedade enorme de estabelecimentos e serviços!', description: 'Aqui você encontra lavanderias, restaurantes, padarias, hotéis, dentistas, lojas de discos, cinemas, tradutores, eletricistas, pedreiros, marceneiros, técnicos de computadores e muito mais!', services: ''});
});

module.exports = router;
