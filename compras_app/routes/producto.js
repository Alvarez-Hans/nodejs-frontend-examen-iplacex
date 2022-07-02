var express = require('express');
var router = express.Router();
const { isLoggedIn } = require('../lib/auth');

// --
const { sequelize, listas_detalle, tiendas } = require('../models');


let descomponeBody = (req, listaDetalle) => {
  listaDetalle.producto = req.body.producto;
  listaDetalle.id_tienda = req.body.id_tienda;
  listaDetalle.costo_presupuesto = req.body.costo_presupuesto;
  listaDetalle.costo_real = req.body.costo_real;
  listaDetalle.comprado = (req.body.comprado == 'on') ? true : false;;
  listaDetalle.notas = req.body.notas;
  return listaDetalle;
}

let validarCreate = (req, res, next) => {
  console.log("validarCreate")

  let errors = [];
  if (!req.body.costo_presupuesto) {
    errors.push({ msg: 'El Monto del Prosupuesto es requerido' });
  }
  if (req.body.costo_presupuesto <= 0) {
    errors.push({ msg: 'El Monto del Prosupuesto debe ser mayor a 0' });
  }

  console.log({ errors });
  if (errors.length > 0) {
    const _tiendas = tiendas.findAll();
    let _lista_detalle = descomponeBody(req, {});
    res.render('producto/create-update', { id_lista: req.params.id_lista, _tiendas, errors, _lista_detalle });
  } else {
    return next()
  }
}

let validarUpdate = (req) => {
  console.log("validarCreate")

  let errors = [];
  if (!req.body.costo_presupuesto) {
    errors.push({ msg: 'El Monto del Prosupuesto es requerido' });
  }
  if (req.body.costo_presupuesto <= 0) {
    errors.push({ msg: 'El Monto del Prosupuesto debe ser mayor a 0' });
  }

  console.log({ errors });
  return errors;
}


/* C R E A T E functions. */
router.get('/create/:id_lista', isLoggedIn, async function (req, res, next) {
  console.log(req.params);
  const { id_lista } = req.params;
  const _tiendas = await tiendas.findAll();

  // console.debug({ id_lista, _tiendas });

  res.render('producto/create-update', { id_lista, _tiendas })
});

router.post('/create/:id_lista', isLoggedIn, validarCreate, async (req, res, next) => {
  //console.log("post('/create/:id_lista')");
  _listas_detalle = descomponeBody(req, {});
  _listas_detalle.id_lista = req.params.id_lista;
  _listas_detalle.comprado = false; //la validacion de una producto nace en falso
  console.debug({ _listas_detalle });


  try {
    const _producto = await listas_detalle.create(_listas_detalle);
    console.debug('producto de compra creada sin problemas.', { _producto });
    res.redirect('/lista/update/' + _producto.id_lista);
  } catch (error) {
    // TODO: Pendiente de generar error
    console.error({ error });
  }
});

/* U P D A T E functions. */
router.get('/update/:id', isLoggedIn, async function (req, res, next) {
  console.log(req.params);

  const { id } = req.params;

  const _lista_detalle = await listas_detalle.findByPk(id);
  const _tiendas = await tiendas.findAll();

  res.render('producto/create-update', { _lista_detalle, _tiendas });
});


router.post('/update/:id', isLoggedIn, async function (req, res, next) {
  console.log('req.params', req.params);
  console.log('req.body', req.body);

  const { id } = req.params;
  const _producto = await listas_detalle.findByPk(id);
  descomponeBody(req, _producto);

  const errors = validarUpdate(req, res)
  if (errors.length > 0) { 
    const _tiendas = tiendas.findAll();
    return res.render('producto/create-update', { id_lista: _producto.id_lista, _tiendas, errors, _lista_detalle:_producto });
  }


  try {
    await _producto.save();
    console.debug('producto actualizada sin problemas.', { _producto });
    res.redirect('/lista/update/' + _producto.id_lista);
  } catch (error) {
    // TODO: Pendiente de generar error
    console.error({ error });
  }
});

/* DELETE functions. */
router.get('/delete/:id', isLoggedIn, async function (req, res, next) {
  console.log(req.params);

  const { id } = req.params;

  const _producto = await listas_detalle.findByPk(id);
  try {
    await _producto.destroy();
    console.debug('producto eliminada sin problemas.', { _producto });
    res.redirect('/lista/update/' + _producto.id_lista);
  } catch (error) {
    // TODO: Pendiente de generar error
    console.error({ error });
  }
});


module.exports = router;
