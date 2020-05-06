const express = require('express');

const ScreamController = require('./controllers/ScreamController');

const routes = express.Router();

routes.get('/screams', ScreamController.index);
routes.post('/screams', ScreamController.create);

module.exports = routes;