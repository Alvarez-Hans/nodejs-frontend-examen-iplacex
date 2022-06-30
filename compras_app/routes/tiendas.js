var express = require('express');
var router = express.Router();
// --
const { sequelize, tiendas } = require('../models');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const _tiendas = await tiendas.findAll();
  console.debug('get tiendas', {_tiendas: _tiendas });
  res.render('tiendas/index', { _tiendas: _tiendas });
});

module.exports = router;
