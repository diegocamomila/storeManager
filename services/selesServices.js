const salesModels = require('../models/selesModels');
const productsModels = require('../models/productsModels');

const addSalesProductsValidations = (addSeles, products) => {
    // verifica se o campo productId tem valor
  if (addSeles.some((e) => !e.productId)) {
  return { error: { code: 400, message: '"productId" is required' } };
  }
    // verifica se o campo quantity tem valor
  if (addSeles.some((e) => !e.quantity)) {
  return { error: { code: 400, message: '"quantity" is required' } };
  } 
    // verifica se o campo quantity tem valor menor ou igual 0
  if (addSeles.some((e) => e.quantity <= 0)) {
    return {
      error: { code: 422, message: '"quantity" must be greater than or equal to 1' },
    };
  }
  // verifica se é possivel a venda de produto inexixtente requisiçao
  // com apenas um item ou varios 
  // "every" testa todos elementos do arry. "some" retorna false até atender a condiçao ai true
  if (!addSeles.every((e) => products.some((p) => e.productId === p.id))) {
    return { error: { code: 404, message: 'Product not found' } };
  }
  
  return false;
};

const addSalesProducts = async (addSales) => {
  const productsList = await productsModels.getAll();

  const validate = addSalesProductsValidations(addSales, productsList);
  if (validate) {
    return validate;
  }
  
  const id = await salesModels.addSales();
    
  await Promise.all(addSales
    .map((sale) => salesModels.addSalesProducts(id, sale.productId, sale.quantity)));
  return {
    id,
    itemsSold: addSales,
  }; 
};

module.exports = {
  addSalesProductsValidations,
  addSalesProducts, 
};