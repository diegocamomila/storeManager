const productsModels = require('../models/productsModels');

const getAll = async () => {
  const rows = await productsModels.getAll();
  if (!rows) return [];
  return rows;
};

module.exports = {
  getAll,
};