const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id;';
  const [rows] = await connection.execute(query);

  return rows;
};

module.export = {
  getAll,
};