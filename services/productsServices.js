const productsModels = require('../models/productsModels');

const treatsError = (status, message) => ({ status, message });

const getAll = async () => {
  const rows = await productsModels.getAll();
  if (!rows || null) {
    throw treatsError(404, 'Products not found');
  }
  return rows;
};

const getById = async (id) => {
  const rows = await productsModels.getById(id);
  if (!rows || null) {
    throw treatsError(404, 'Product not found');
  }
  return rows;
};
// const products = await productsModels.getAll();
const addProduct = async (name) => {
  const product = await productsModels.getAll().indexOf(name) === name;
     if (product) {
    throw treatsError(409, 'Product already exists');
    }
  const createProduct = await productsModels.addProduct(name); 
  return createProduct;
};

const updateProduct = async (name) => {
  const product = await productsModels.getById().indexOf(name.id) === 0;
  if (product.length === 0) {
    throw treatsError(404, 'Product not found');
  }
  await productsModels.updateProduct(name);
};

module.exports = {
  getAll,
  getById,
  addProduct,
  updateProduct,
};