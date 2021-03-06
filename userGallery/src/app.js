const express = require ('express');

const app = express ();

app.use (express.json ());

const userController = require ('./controllers/product.controller');

const galleryController = require ('./controllers/gallery.controller');

app.use ('/users', userController);

app.use ('/gallery', galleryController);

module.exports = app;
