var express = require('express');
var router = express.Router();
const { isLoggedIn } = require('../lib/auth');

// --
const { sequelize, listas, listas_detalle } = require('../models');

/* CREATE functions. */
router.get('/create', isLoggedIn, async function (req, res, next) {
  res.render('lista/create')
});

router.post('/create', isLoggedIn, async (req, res, next) => {
  console.debug(req.body);
  console.debug(req.user);

  const { nombre, } = req.body;
  const id_usuario = req.user.id;
  const validado = false; //la validacion de una lista nace en falso

  try {
    const _lista = await listas.create({ id_usuario, nombre });
    console.debug('Lista de compra creada sin problemas.', { _lista });
    res.redirect('/listas');
  } catch (error) {
    // TODO: Pendiente de generar error
    console.error({ error });
  }
});

/* UPDATE functions. */
router.get('/update/:id', isLoggedIn, async function (req, res, next) {
  console.log(req.params);

  const { id } = req.params;

  const _lista = await listas.findByPk(id);
  const _listas_detalle = await listas_detalle.findAll({ where: { id_lista: id } })
  console.debug({_listas_detalle});

  res.render('lista/update', { _lista, _listas_detalle });
});


router.post('/update/:id', isLoggedIn, async function (req, res, next) {
  console.log('req.params', req.params);
  console.log('req.body', req.body);

  const { id } = req.params;
  const { nombre, nombre_sucursal, direccion, cuidad, region } = req.body;

  const _lista = await listas.findByPk(id);
  _lista.nombre = nombre;
  _lista.nombre_sucursal = nombre_sucursal;
  _lista.direccion = direccion;
  _lista.cuidad = cuidad;
  _lista.region = region;

  try {
    await _lista.save();
    console.debug('lista actualizada sin problemas.', { _lista });
    res.redirect('/listas');
  } catch (error) {
    // TODO: Pendiente de generar error
    console.error({ error });
  }
});

/* DELETE functions. */
router.get('/delete/:id', isLoggedIn, async function (req, res, next) {
  console.log(req.params);

  const { id } = req.params;

  const _lista = await listas.findByPk(id);
  try {
    await _lista.destroy();
    console.debug('lista eliminada sin problemas.', { _lista });
    res.redirect('/listas');
  } catch (error) {
    // TODO: Pendiente de generar error
    console.error({ error });
  }
});


module.exports = router;
