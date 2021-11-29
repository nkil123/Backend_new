const express = require ('express');

const app = express ();

app.use (express.json ());

const skillController = require ('./controllers/skills.controllers');
const companyController = require ('./controllers/company.controllers');
const jobController = require ('./controllers/jobs.controllers');

app.use ('/skills', skillController);
app.use ('/company', companyController);
app.use ('/jobs', jobController);

module.exports = app;
