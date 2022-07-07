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

// const addProduct = async (name) => {
//   const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
//   const [rows] = await connection.execute(query, [name]);
//   const id = rows.insertId;
  
//   return { id, name };
//   };

// const updateProduct = async ({ id, name }) => {
//   const query = 'UPDATE StoreManager.products SET name = ?, WHERE id = ?;';
//   await connection.execute(query, [name, id]);

//   return { id, name };
// };

module.exports = {
  getAll,
  getById,
  // addProduct,
  // updateProduct,
};