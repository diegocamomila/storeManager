const connection = require('../helpers/connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id;';
  const [rows] = await connection.execute(query);

  return rows;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [rows] = await connection.execute(query, [id]);

  return rows;
};

const addProduct = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [row] = await connection.execute(query, [name]);
  const rowsAdd = { id: row.insertId, name };
   
  return rowsAdd;
};

const updateProduct = async (id, name) => {
  const validateId = await getById(id);
    if (validateId.length === 0) return [];
  
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?;';
    await connection.execute(query, [name, id]);
    const result = { id, name };
    
  return result;
};

const deleteProduct = async (id) => {
  const searchId = await getById(id);
    if (searchId.length === 0) return [];

  const query = 'DELETE FROM StoreManager.products WHERE id = ?;';
    const [rows] = await connection.execute(query, [id]);

  return rows;
};

module.exports = {
  getAll,
  getById,
  addProduct,
  updateProduct,
  deleteProduct,
};