const productsServices = require('../services/productsServices');

const getAll = async (_req, res, next) => {
    try {
    const products = await productsServices.getAll();
    return res.status(200).json(products);    
  } catch (error) {
    next(error);
  }
};  
  
const getById = async (req, res, next) => {
  const { id } = req.params;
    try {
    const product = await productsServices.getById(id);
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const addProduct = async (req, res) => {
  const { name } = req.body;
  const id = await productsServices.addProduct(name); 
  res.status(201).json({ id, name });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const product = { id: +id, name };
  await productsServices.updateProduct(product);
  res.status(200).json(product);
};

module.exports = {
  getAll,
  getById,
  addProduct,
  updateProduct,
};