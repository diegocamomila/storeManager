const express = require('express');
const ProductsController = require('../controllers/productsControllers');

const router = express.Router();

router.get('/', ProductsController.getAll);
// router.get('/:id', ProductsController.getById);

module.exports = router;