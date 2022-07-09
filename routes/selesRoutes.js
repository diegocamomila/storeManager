const express = require('express');
const salesControllers = require('../controllers/selesControllers');

const selesRoutes = express.Router();

selesRoutes.post('/', salesControllers.addSalesProducts);

module.exports = selesRoutes;