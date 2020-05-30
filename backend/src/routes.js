const express = require('express');

const ScreamController = require('./controllers/ScreamController');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/screams', ScreamController.index);
routes.post('/screams', ScreamController.create);
routes.get('/users', UserController.index);
routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

// New
routes.post('/login', SessionController.login);
routes.delete('/logout', SessionController.logout);
routes.post('/protected', SessionController.protected);
routes.post('/refresh_token', SessionController.refresh_token);

module.exports = routes;