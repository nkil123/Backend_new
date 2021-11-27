const express = require ('express');

const app = express ();

app.use (express.json ());

//all the models are called inside the controller

const usersController = require ('./controllers/users.controller');

const authorsController = require ('./controllers/authors.controller');

const booksController = require ('./controllers/books.controller');

const sectionsController = require ('./controllers/sections.controller');

app.use ('/users', usersController);

app.use ('/authors', authorsController);

app.use ('/books', booksController);

app.use ('/sections', sectionsController);

module.exports = app;
