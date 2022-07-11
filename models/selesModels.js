const connection = require('../helpers/connection');

const addSales = async () => {
  const query = 'INSERT INTO sales (date) VALUES (NOW());';
  const [rows] = await connection.execute(query);

  return rows.insertId;
};

const addSalesProducts = async (id, productId, quantity) => {
  const query = `INSERT INTO StoreManager.sales_products 
  (sale_id, product_id, quantity) VALUES (?,?,?);`;
  await connection.execute(query, [id, productId, quantity]);

  return {
    id,
    productId,
    quantity,
  };
};

const getAllSales = async () => {
  const query = `SELECT sale_id, date, product_id, quantity
      FROM StoreManager.sales_products AS sales_products
      RIGHT JOIN StoreManager.sales AS sales
      ON sales.id = sales_products.sale_id
      ORDER BY sale_id ASC, product_id ASC;`;
  const [results] = await connection.execute(query);
  return results;
};

const getByIdSales = async (id) => {
  const query = `SELECT date, product_id, quantity
      FROM StoreManager.sales_products AS sales_products
      RIGHT JOIN StoreManager.sales AS sales
      ON sales.id = sales_products.sale_id
      WHERE sale_id = ?
      ORDER BY sale_id, product_id;`;
  const [results] = await connection.execute(query, [id]);
  return results;
};

module.exports = {
  addSales,
  addSalesProducts,
  getAllSales,
  getByIdSales,
};