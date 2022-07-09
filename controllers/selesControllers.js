const salesServices = require('../services/selesServices');

const addSalesProducts = async (req, res) => {
  const newSales = req.body;

  const result = await salesServices.addSalesProducts(newSales);

  if (result.error) {
    return res.status(result.error.code).json({ message: result.error.message });
  }

  res.status(201).json(result); 
};

module.exports = {
  addSalesProducts,
};