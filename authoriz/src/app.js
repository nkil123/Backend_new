const express = require ('express');
const {register, login} = require ('./controllers/auth.controller');
const {body} = require ('express-validator');
const app = express ();
const passport = require ('./configs/passport');
app.use (express.json ());

app.use (passport.initialize ());
//"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
app.use (express.json ());
const productController = require ('./controllers/products.controller');
app.post (
  '/signup',
  body ('email').custom (async value => {
    const isEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test (value);

    if (!isEmail) {
      throw new Error ('please Enter proper email');
    }

    return true;
  }),
  body ('password').custom (async value => {
    const isPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test (
      value
    );

    if (!isPassword) {
      throw new Error (
        'please Enter Minimum eight characters, at least one letter, one number and one special character:'
      );
    }

    return true;
  }),
  register
);
app.post ('/signin', login);

app.use ('/products', productController);

app.get (
  '/auth/google',
  passport.authenticate ('google', {
    scope: ['email', 'profile'],
  })
);

app.get (
  '/auth/google/callback',
  passport.authenticate ('google', {
    failureRedirect: '/auth/google/failure',
  }),
  function (req, res) {
    return res.status (201).json ({user: req.user.user, token: req.user.token});
  }
);

app.get ('/auth/google/failure', function (req, res) {
  return res.send ('Something went wrong');
});
passport.serializeUser (function ({user, token}, done) {
  done (null, {user, token});
});
passport.deserializeUser (function (user, done) {
  done (err, user);
});
module.exports = app;
