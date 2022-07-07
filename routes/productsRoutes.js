const express = require('express');
const rescue = require('express-rescue');
const productsControllers = require('../controllers/productsControllers');

const productsRoutes = express.Router();

productsRoutes.get('/products', 
  rescue(productsControllers.getAll));

module.exports = productsRoutes;