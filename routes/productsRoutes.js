const express = require('express');
const productsControllers = require('../controllers/productsControllers');
// const rescue = require(' express.rescue'); 
// const validations = require('../middlewares/productsMiddlewares');

const routes = express.Router();

routes.get('/:id', (productsControllers.getById));
routes.get('/', (productsControllers.getAll));

// routes.post('/', (productsControllers.addProduct));
// routes.put('/:id', (productsControllers.updateProduct));

module.exports = routes;