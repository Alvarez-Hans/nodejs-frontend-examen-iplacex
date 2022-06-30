var express = require('express');
var router = express.Router();
// --
const { sequelize, usuarios } = require('../models');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const _usuarios = await usuarios.findAll();
  console.debug('get usuarios', {_usuarios});
  res.render('usuarios/index', { _usuarios });
});


module.exports = router;
