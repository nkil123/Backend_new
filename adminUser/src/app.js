const express = require ('express');

const app = express ();

app.use (express.json ());

const productsController = require ('./controllers/users.controller');

app.use ('/users', productsController);

module.exports = app;
