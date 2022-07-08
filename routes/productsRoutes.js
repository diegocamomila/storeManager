const express = require('express');
const productsControllers = require('../controllers/productsControllers');
// const rescue = require(' express.rescue'); 
const { validation } = require('../middlewares/productsMiddlewares');

const routes = express.Router();

routes.put('/:id', validation, productsControllers.updateProduct);
routes.get('/:id', (productsControllers.getById));
routes.get('/', (productsControllers.getAll));
routes.post('/', validation, productsControllers.addProduct);

module.exports = routes;