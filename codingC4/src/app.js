const express = require ('express');
const {register, login} = require ('./controllers/auth.controller');
const app = express ();
app.use (express.json ());
app.post ('/register', register);
app.post ('/login', login);

const userController = require ('./controllers/user.controller');
app.use ('/users', userController);

const movieController = require ('./controllers/movie.controller');
app.use ('/movies', movieController);

const theatreController = require ('./controllers/theatre.controller');
app.use ('/theatres', theatreController);

const screenController = require ('./controllers/screen.controller');
app.use ('/screens', screenController);

const showController = require ('./controllers/shows.controller');
app.use ('/shows', showController);

module.exports = app;
