const productsServices = require('../services/productsServices');

const getAll = async (req, res) => {
  const { rows } = await productsServices.getAll();
  
  return res.status(200).json(rows);
};

module.exports = {
  getAll,
};