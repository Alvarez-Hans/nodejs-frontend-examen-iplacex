var express = require('express');
var router = express.Router();
const { isLoggedIn } = require('../lib/auth');

// --
const { sequelize, listas_detalle, tiendas } = require('../models');

/* CREATE functions. */
router.get('/create/:id_lista', isLoggedIn, async function (req, res, next) {
  console.log(req.params);
  const { id_lista } = req.params;
  const _tiendas = await tiendas.findAll();

  res.render('producto/create', { id_lista, _tiendas })
});

router.post('/create/:id_lista', isLoggedIn, async (req, res, next) => {
  console.debug(req.body);
  console.debug(req.user);
  console.debug(req.params);

  const { id_lista } = req.params;
  const { producto, id_tienda, costo_presupuesto, costo_real, comprado, notas } = req.body;
  const id_usuario = req.user.id;


  const validado = false; //la validacion de una producto nace en falso
  console.debug({ id_lista, producto, id_tienda, costo_presupuesto, costo_real, comprado, notas });

  try {
    const _producto = await listas_detalle.create({ id_lista, producto, id_tienda, costo_presupuesto, costo_real, comprado, notas });
    console.debug('producto de compra creada sin problemas.', { _producto });
    res.redirect('/lista/update/'+id_lista);
  } catch (error) {
    // TODO: Pendiente de generar error
    console.error({ error });
  }
});

/* UPDATE functions. */
router.get('/update/:id', isLoggedIn, async function (req, res, next) {
  console.log(req.params);

  const { id } = req.params;

  const _lista_detalle = await listas_detalle.findByPk(id);
  const _tiendas = await tiendas.findAll();

  res.render('producto/update', { _lista_detalle, _tiendas });
});


router.post('/update/:id', isLoggedIn, async function (req, res, next) {
  console.log('req.params', req.params);
  console.log('req.body', req.body);

  const { id } = req.params;
  const { producto, id_tienda, costo_presupuesto, costo_real, comprado, notas } = req.body;

  const _producto = await listas_detalle.findByPk(id);
  _producto.producto = producto;
  _producto.id_tienda = id_tienda;
  _producto.costo_presupuesto = costo_presupuesto;
  _producto.costo_real = costo_real;
  _producto.comprado = (comprado=='on') ? true : false;
  _producto.notas = notas;

  try {
    await _producto.save();
    console.debug('producto actualizada sin problemas.', { _producto });
    res.redirect('/lista/update/'+_producto.id_lista);
  } catch (error) {
    // TODO: Pendiente de generar error
    console.error({ error });
  }
});

/* DELETE functions. */
router.get('/delete/:id', isLoggedIn, async function (req, res, next) {
  console.log(req.params);

  const { id } = req.params;

  const _producto = await _lista_detalle.findByPk(id);
  try {
    await _producto.destroy();
    console.debug('producto eliminada sin problemas.', { _producto });
    res.redirect('/lista/update/'+_producto.id_lista);
  } catch (error) {
    // TODO: Pendiente de generar error
    console.error({ error });
  }
});


module.exports = router;
