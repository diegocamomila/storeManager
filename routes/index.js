const express = require('express');
const productsRoutes = require('./productsRoutes');
const selesRoutes = require('./selesRoutes');

const router = express.Router();

router.use('/products', productsRoutes);
router.use('/sales', selesRoutes);

module.exports = router;