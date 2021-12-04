const express = require ('express');
const {register, login} = require ('./controllers/auth.controller');
const {body} = require ('express-validator');
const app = express ();
//"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
app.use (express.json ());
const productController = require ('./controllers/products.controller');
app.post (
  '/signup',
  body ('name')
    .isLength ({
      min: 4,
      max: 20,
    })
    .withMessage (
      'first name is required with atleast 4 chars and max 20 char'
    ),
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
app.post (
  '/signin',
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
  login
);
app.use ('/products', productController);

module.exports = app;
