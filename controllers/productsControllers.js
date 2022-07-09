const productsServices = require('../services/productsServices');

const getAll = async (_req, res) => {
  const rows = await productsServices.getAll();
    res.status(200).send(rows);
};
  
const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.getById(id);

    if (!product || product.length < 1) {
      return res.status(404).send({ message: 'Product not found' });
  }

     res.status(200).send(product[0]);
};

const addProduct = async (req, res) => {
  const { name } = req.body;
  const product = await productsServices.addProduct(name); 
 
    if (product.error) {
      return res.status(product.error.code).json({ message: product.error.message });
    }
    res.status(201).send({ product });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  
  const product = await productsServices.updateProduct(id, name);
     
    if (product.error) {
      return res.status(product.error.code).json({ message: product.error.message });
    }
    res.status(200).send(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const result = await productsServices.deleteProduct(id);

    if (result.error) {
      return res.status(result.error.code).json({ message: result.error.message });
    }
    res.status(204).json(result);
};

module.exports = {
  getAll,
  getById,
  addProduct,
  updateProduct,
  deleteProduct,
};