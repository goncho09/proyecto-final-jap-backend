const express = require('express');
const productController = require('../controllers/productController');

const route = express.Router();


route.get('/:id', productController.getProductById)

route.get('/comments/:id', productController.getAllComments)

module.exports = route;