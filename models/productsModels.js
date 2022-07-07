const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id;';
  const [rows] = await connection.execute(query);

  return rows;
};

const getById = async (id) => {
  const [product] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?;', [id]);

  return product;
};

module.exports = {
  getAll,
  getById,
};