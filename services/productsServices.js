const productsModels = require('../models/productsModels');

const getAll = async () => {
  const rows = await productsModels.getAll();
  if (!rows || rows.length === 0) return [];
   
  return rows;
};

const getById = async (id) => {
  const product = await productsModels.getById(id);
  if (!product || product.length === 0) return [];

  return product;
};

const addProduct = async (name) => {
  if (!name || name === undefined) {
    return {
      error: { code: 400, message: '"name" is required' },
    }; 
  }

  if (name.length < 5) {
    return {
      error: { code: 422, message: '"name" length must be at least 5 characters long' },
    };
  }
  
  const product = await productsModels.addProduct(name);
  return product;
};

const updateProduct = async (id, name) => {
  if (!name) {
 return {
    error: { code: 400, message: '"name" is required' },
  }; 
}
  
  if (name.length < 5) {
 return {
      error: { code: 422, message: '"name" length must be at least 5 characters long' },
    }; 
}
    
  const product = await productsModels.updateProduct(id, name);
  if (product.length === 0) {
 return {
    error: { code: 404, message: 'Product not found' },
  }; 
} 

  return product;
}; 
    
const deleteProduct = async (id) => {
  const result = await productsModels.deleteProduct(id);
  if (result.length === 0) {
    return {
      error: { code: 404, message: 'Product not found' },
    };
  }
  
  return result;
};

module.exports = {
  getAll,
  getById,
  addProduct,
  updateProduct,
  deleteProduct,
};