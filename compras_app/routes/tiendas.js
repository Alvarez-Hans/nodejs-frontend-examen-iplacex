var express = require('express');
var router = express.Router();
const { isLoggedIn } = require('../lib/auth');

// --
const { sequelize, tiendas } = require('../models');

/* GET users listing. */
router.get('/', isLoggedIn,async function(req, res, next) {
  const _tiendas = await tiendas.findAll();
  console.debug('get tiendas', {_tiendas: _tiendas });
  res.render('tiendas/index', { _tiendas: _tiendas });
});


router.get('/validars', isLoggedIn,async function(req, res, next) {
  const id_usuario = req.user.id;

  const _tiendas = await tiendas.findAll({ where: { id_usuario: { $not: '12' }  }});
  // const _tiendas = await tiendas.findAll({ where: { validado: false, id_usuario: { $not: id_usuario }  }});
  console.debug('get tiendas', {_tiendas: _tiendas });
  res.render('tiendas/validars', { _tiendas: _tiendas });
});


module.exports = router;
