const connection = require('./connection');

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

const addProduct = async ({ name }) => {
  const QUERY = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [rows] = await connection.execute(QUERY, [name]);
  const result = {
    id: rows.insertId,
    name,
  };

  return { result };
};

const updateProduct = async ({ id, name }) => {
  const QUERY = 'UPDATE StoreManager.products SET name = ?, WHERE id = ?;';
  await connection.execute(QUERY, [name, id]);

  return { id, name };
};

module.exports = {
  getAll,
  getById,
  addProduct,
  updateProduct,
};