var express = require('express');
var router = express.Router();
// --
const { sequelize, tiendas } = require('../models');



/* CREATE functions. */
router.get('/create', async function (req, res, next) {
  res.render('tienda/create')
});

router.post('/create', async (req, res, next) => {
  console.log(req.body);

  const { nombre, nombre_sucursal, direccion, cuidad, region } = req.body;
  const validado = false; //la validacion de una tienda nace en falso
  const id_usuario = req.user.id;

  try {
    const _tienda = await tiendas.create({ nombre, nombre_sucursal, direccion, cuidad, region, validado, id_usuario });
    console.debug('Tienda creada sin problemas.', { _tienda });
    res.redirect('/tiendas');
  } catch (error) {
    // TODO: Pendiente de generar error
    console.error({ error });
  }
});

/* UPDATE functions. */
router.get('/update/:id', async function (req, res, next) {
  console.log(req.params);

  const { id } = req.params;

  const _tienda = await tiendas.findByPk(id);
  res.render('tienda/update', { _tienda });
});


router.post('/update/:id', async function (req, res, next) {
  console.log('req.params', req.params);
  console.log('req.body', req.body);

  const { id } = req.params;
  const { nombre, nombre_sucursal, direccion, cuidad, region } = req.body;

  const _tienda = await tiendas.findByPk(id);
  _tienda.nombre = nombre;
  _tienda.nombre_sucursal = nombre_sucursal;
  _tienda.direccion = direccion;
  _tienda.cuidad = cuidad;
  _tienda.region = region;

  try {
    await _tienda.save();
    console.debug('Tienda actualizada sin problemas.', { _tienda });
    res.redirect('/tiendas');
  } catch (error) {
    // TODO: Pendiente de generar error
    console.error({ error });
  }
});

/* DELETE functions. */
router.get('/delete/:id', async function (req, res, next) {
  console.log(req.params);

  const { id } = req.params;

  const _tienda = await tiendas.findByPk(id);
  try {
    await _tienda.destroy();
    console.debug('Tienda eliminada sin problemas.', { _tienda });
    res.redirect('/tiendas');
  } catch (error) {
    // TODO: Pendiente de generar error
    console.error({ error });
  }
});


module.exports = router;
