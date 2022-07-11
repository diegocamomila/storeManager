const express = require('express');
const salesControllers = require('../controllers/salesControllers');

const salesRoutes = express.Router();

salesRoutes.get('/:id', salesControllers.getByIdSales);
salesRoutes.post('/', salesControllers.addSalesProducts);
salesRoutes.get('/', salesControllers.getAllSales);

module.exports = salesRoutes;