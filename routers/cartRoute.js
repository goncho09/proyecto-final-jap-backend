const express = require('express');
const { postCart } = require('../controllers/cartController');

const route = express.Router();

route.post('/', postCart);

module.exports = route;
