const salesModels = require('../models/selesModels');
const productsModels = require('../models/productsModels');

// "some" precisa que apena um elemento do arry atenda para retornar true
// [12, 5, 8, 1, 4].some(elem => elem > 10); // true

// "every" precisa todos elemento do arry atenda para retornar true
// [12, 54, 18, 130, 44].every(elem => elem >= 10); // true

const addSalesValidations = (addSeles, listeProducts) => {
    // verifica se o campo productId tem valor
  if (addSeles.some((elem) => !elem.productId)) {
  return { error: { code: 400, message: '"productId" is required' } };
  }
    // verifica se o campo quantity tem valor
  if (addSeles.some((elem) => !elem.quantity)) {
  return { error: { code: 400, message: '"quantity" is required' } };
  } 
    // verifica se o campo quantity tem valor menor ou igual 0
  if (addSeles.some((elem) => elem.quantity <= 0)) {
    return {
      error: { code: 422, message: '"quantity" must be greater than or equal to 1' },
    };
  }
  // verifica se é possivel a venda de produto inexixtente requisiçao
  // com apenas um item ou varios 
  if (!addSeles.every((elem) => listeProducts.some((prodt) => elem.productId === prodt.id))) {
    return { error: { code: 404, message: 'Product not found' } };
  }
  
  return false;
};
                                 // productID: 2, quantity: 5
const addSalesProducts = async (addSalesPT) => {
  const productsList = await productsModels.getAll();

  const validation = addSalesValidations(addSalesPT, productsList);
  if (validation) {
    return validation; // false
  }
  
  const id = await salesModels.addSales();
    
  await Promise.all(addSalesPT
    .map((sale) => salesModels.addSalesProducts(id, sale.productId, sale.quantity)));
  return {
    id,
    itemsSold: addSalesPT,
  }; 
};

module.exports = {
  addSalesValidations,
  addSalesProducts, 
};