const express = require('express')
const publishController = require('../controllers/publishController');

const route = express.Router();


route.get('/', publishController.publish)

module.exports = route;