const express = require('express');
const checkSesionController = require('../controllers/checkSesionController');

const route = express.Router();

route.get('/', checkSesionController.checksesion);

module.exports = route;
