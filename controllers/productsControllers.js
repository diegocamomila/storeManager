const productsServices = require('../services/productsServices');

const getAll = async (_req, res) => {
    const rows = await productsServices.getAll();
    return res.status(200).json(rows);
};  
  
const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.getById(id);
  if (!product || null) {
    return res.status(404).json({ error: 'Product not found' });
  }
  return res.status(200).json(product);
};

// const addProduct = async (req, res) => {
//   const { name } = req.body;
//   const id = await productsServices.addProduct(name); 
//   res.status(201).json({ id, name });
// };

// const updateProduct = async (req, res) => {
//   const { id } = req.params;
//   const { name } = req.body;
//   const product = { id: +id, name };
//   await productsServices.updateProduct(product);
//   res.status(200).json(product);
// };

module.exports = {
  getAll,
  getById,
  // addProduct,
  // updateProduct,
};