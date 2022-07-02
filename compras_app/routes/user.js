var express = require('express');
var router = express.Router();
// --
const { sequelize, usuarios } = require('../models');
const { isLoggedIn } = require('../lib/auth');

/* CREATE functions. */
router.get('/create', async function(req, res, next) {
  res.render('usuario/create')
});

router.post('/create', async (req, res, next) => {
    console.log(req.body);

    const { nombre, usuario, password } = req.body;

    try {
      const _usuario = await usuarios.create({ nombre, usuario, password });
      console.debug('Usuario creado sin problemas.', { _usuario });
      res.redirect('/usuarios');
    } catch (error) {
      // TODO: Pendiente de generar error
      console.error({ error });
    }
  });

/* UPDATE functions. */
router.get('/update/:id', isLoggedIn, async function(req, res, next) {
  console.log(req.params);

  const { id } = req.params;

  const _usuario = await usuarios.findByPk( id );
  res.render('usuario/update', { _usuario });
});


router.post('/update/:id', isLoggedIn, async function(req, res, next) {
  console.log('req.params', req.params);
  console.log('req.body', req.body);

  const { id } = req.params;
  const { nombre, usuario, password } = req.body;

  const _usuario = await usuarios.findByPk( id );
  _usuario.nombre = nombre;
  _usuario.usuario = usuario;
  _usuario.password = password;

  try {
    await _usuario.save();
    console.debug('Usuario actualizado sin problemas.', { _usuario });
    res.redirect('/usuarios');
  } catch (error) {
    // TODO: Pendiente de generar error
    console.error({ error });
  }
});

/* DELETE functions. */
router.get('/delete/:id', isLoggedIn, async function(req, res, next) {
  console.log(req.params);

  const { id } = req.params;

  const _usuario = await usuarios.findByPk( id );
  try {
    await _usuario.destroy();
    console.debug('Usuario eliminado sin problemas.', { _usuario });
    res.redirect('/usuarios');
  } catch (error) {
    // TODO: Pendiente de generar error
    console.error({ error });
  }  
});


module.exports = router;
