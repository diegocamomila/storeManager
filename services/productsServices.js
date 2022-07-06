const productsModels = require('../models/productsModels');

const treatsError = (status, message) => ({ status, message });

const getAll = async () => {
  const rows = await productsModels.getAll();
  if (rows.length < 1) {
    throw treatsError(404, 'Products not found');
  }
  return rows;
};

module.exports = {
  getAll,
};