const express = require('express');
const productsControllers = require('../controllers/productsControllers');
// const rescue = require(' express.rescue'); 

const routes = express.Router();

  routes.get('/:id', productsControllers.getById);
  routes.put('/:id', productsControllers.updateProduct);
  routes.delete('/:id', productsControllers.deleteProduct);
  routes.get('/', productsControllers.getAll);
  routes.post('/', productsControllers.addProduct);

module.exports = routes;