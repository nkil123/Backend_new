const express = require ('express');

const app = express ();

app.use (express.json ());

app.set ('view engine', 'ejs');
const productsController = require ('./controllers/product.controller');

app.use ('/products', productsController);

module.exports = app;
