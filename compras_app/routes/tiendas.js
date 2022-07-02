var express = require('express');
var router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const { Op } = require('sequelize');

// --
const { sequelize, tiendas } = require('../models');

/* GET users listing. */
router.get('/', isLoggedIn,async function(req, res, next) {
  const _tiendas = await tiendas.findAll();
  //console.debug('get tiendas', {_tiendas: _tiendas });
  res.render('tiendas/index', { _tiendas: _tiendas });
});


router.get('/validar', isLoggedIn,async function(req, res, next) {
  const id_usuario = req.user.id;

  const _tiendas = await tiendas.findAll({ where: { validado: false, id_usuario: { [Op.not]: id_usuario }  }});
  console.debug('get tiendas', {_tiendas: _tiendas });
  res.render('tiendas/validar', { _tiendas: _tiendas });
});

router.get('/validar/:id', isLoggedIn, async function(req, res, next) {
  const id_usuario = req.user.id;

  const { id } = req.params;
  const _tienda = await tiendas.findByPk(id);
  _tienda.validado = true;

  try {
    await _tienda.save();
    console.debug('Tienda actualizada sin problemas.', { _tienda });
    res.redirect('/tiendas/validar');
  } catch (error) {
    // TODO: Pendiente de generar error
    console.error({ error });
  }
});



module.exports = router;
