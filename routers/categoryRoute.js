const express = require('express')
const catController = require('../controllers/categoryController');

const route = express.Router();

route.get('/', catController.getAllCategory)

route.get('/:id', catController.getCategoryById)

module.exports = route;