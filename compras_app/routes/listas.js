var express = require('express');
var router = express.Router();
// --
const { sequelize, listas } = require('../models');
const { isLoggedIn } = require('../lib/auth');

/* GET users listing. */
router.get('/', isLoggedIn, async function(req, res, next) {
  const id_usuario = req.user.id;

  const _listas = await listas.findAll({ where: { id_usuario: id_usuario } });
  console.debug('get listas', {_listas: _listas });
  res.render('listas/index', { _listas: _listas });
});

module.exports = router;
