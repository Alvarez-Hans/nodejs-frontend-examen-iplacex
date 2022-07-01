const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');

const { sequelize, usuarios } = require('../models');

passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const user = await usuarios.findOne( { where: { usuario: username } } );
  // console.debug({ user });
  if (user) {
    if (password == user.password) {
      req.flash('message', 'Bienvenido ' + user.nombre);
      done(null, user, req);
    } else {
      req.flash('message', 'Password incorrecta!!')
      done(null, false, req);
    }
  } else {
    req.flash('message', 'El usuario no existe.')
    done(null, false, req);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await usuarios.findByPk( id );
  done(null, user);
});
 