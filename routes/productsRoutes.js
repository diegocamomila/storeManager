const express = require('express');
const productsControllers = require('../controllers/productsControllers');
// const rescue = require(' express.rescue'); 

const productsRoutes = express.Router();

  productsRoutes.get('/:id', productsControllers.getById);
  productsRoutes.put('/:id', productsControllers.updateProduct);
  productsRoutes.delete('/:id', productsControllers.deleteProduct);
  productsRoutes.get('/', productsControllers.getAll);
  productsRoutes.post('/', productsControllers.addProduct);

module.exports = productsRoutes;