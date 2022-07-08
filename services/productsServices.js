const { handleError } = require('../middlewares/productsMiddlewares');
const productsModels = require('../models/productsModels');

const getAll = async () => {
  const rows = await productsModels.getAll();
  if (!rows || rows.length === 0) {
    throw handleError(404, 'Product not found');
  }
  
  return rows;
};

const getById = async (id) => {
  const product = await productsModels.getById(id);
  if (product.length === 0) {
    throw handleError(404, 'Product not found');
  }
  return product[0];
};

const addProduct = async (name) => {
  const product = await productsModels.getAll(name);
     if (product.length !== 0) {
    throw handleError(409, 'Product already exists');
    }
  const createProduct = await productsModels.addProduct(name); 
  return createProduct;
};

const updateProduct = async (name) => {
  const product = await productsModels.getById(name.id);
  if (product.length === 0) {
    throw handleError(404, 'Product not found');
  }
  await productsModels.updateProduct(name);
};

module.exports = {
  getAll,
  getById,
  addProduct,
  updateProduct,
};