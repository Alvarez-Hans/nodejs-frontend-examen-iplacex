const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

// iniciar sesion
router.get('/', (req, res) => {
  res.render('login/index');
});


router.post('/', (req, res, next) => {
  // req.check('username', 'Username is Required').notEmpty();
  // req.check('password', 'Password is Required').notEmpty();
  // const errors = req.validationErrors();
  // if (errors.length > 0) {
  //   req.flash('message', errors[0].msg);
  //   res.redirect('/signin');
  // }
  passport.authenticate('local.signin', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});

module.exports = router;