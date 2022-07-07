const productsServices = require('../services/productsServices');

const getAll = async (_req, res, next) => {
  try {
    const rows = await productsServices.getAll();
    return res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};  
  
module.exports = {
  getAll,
};