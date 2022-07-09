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

module.exports = {
  addSales,
  addSalesProducts,
};