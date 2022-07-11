const salesServices = require('../services/selesServices');

const addSalesProducts = async (req, res) => {
  const createNewSales = req.body;

  const result = await salesServices.addSalesProducts(createNewSales);

  if (result.error) {
    return res.status(result.error.code).json({ message: result.error.message });
  }

  res.status(201).json(result); 
};

const getAllSales = async (_req, res) => {
  const results = await salesServices.getAllSales();

  if (!results) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  res.status(200).json(results);
};

const getByIdSales = async (req, res) => {
  const { id } = req.params;
  const result = await salesServices.getByIdSales(id);

  if (!result || result.length < 1) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  res.status(200).json(result);
};

module.exports = {
  addSalesProducts,
  getAllSales,
  getByIdSales,
};