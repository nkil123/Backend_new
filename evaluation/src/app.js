const express = require ('express');

const app = express ();
app.use (express.json ());
//all the models are called inside the controller

const usersController = require ('./controllers/users.controller');
const evaluationsController = require ('./controllers/evaluations.controller');
const studentsController = require ('./controllers/students.controller');
const topicsController = require ('./controllers/topics.controller');

app.use ('/users', usersController);
app.use ('/evaluations', evaluationsController);
app.use ('/students', studentsController);
app.use ('/topics', topicsController);

module.exports = app;
