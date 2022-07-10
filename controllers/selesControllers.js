const salesServices = require('../services/selesServices');

const addSalesProducts = async (req, res) => {
  const createNewSales = req.body;

  const result = await salesServices.addSalesProducts(createNewSales);

  if (result.error) {
    return res.status(result.error.code).json({ message: result.error.message });
  }

  res.status(201).json(result); 
};

module.exports = {
  addSalesProducts,
};