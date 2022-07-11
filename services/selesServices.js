const salesModels = require('../models/selesModels');
const productsModels = require('../models/productsModels');

// "some" precisa que apena um elemento do arry atenda para retornar true
// [12, 5, 8, 1, 4].some(elem => elem > 10); // true

// "every" precisa todos elemento do arry atenda para retornar true
// [12, 54, 18, 130, 44].every(elem => elem >= 10); // true

const addSalesValidations = (createNewSale, listeProducts) => {
    // verifica se o campo productId tem valor
  if (createNewSale.some((elem) => (elem.productId === undefined))) {
  return { error: { code: 400, message: '"productId" is required' } };
  }
    // verifica se o campo quantity tem valor
  if (createNewSale.some((elem) => (elem.quantity === undefined))) {
  return { error: { code: 400, message: '"quantity" is required' } };
  } 
    // verifica se o campo quantity tem valor menor ou igual 0
  if (createNewSale.some((elem) => elem.quantity < 1)) {
    return {
      error: { code: 422, message: '"quantity" must be greater than or equal to 1' },
    };
  }
  // verifica se é possivel a venda de produto inexixtente requisiçao
  // com apenas um item ou varios 
  if (!createNewSale.every((elem) => listeProducts.some((prodt) => elem.productId === prodt.id))) {
    return { error: { code: 404, message: 'Product not found' } };
  }
  
  return false;
};
                                 // productID: 2, quantity: 5
const addSalesProducts = async (createNewSale) => {
  const productsList = await productsModels.getAll();

  const validation = addSalesValidations(createNewSale, productsList);
  if (validation) {
    return validation; // false
  }
  
  const id = await salesModels.addSales();
    
  await Promise.all(createNewSale
    .map((sale) => salesModels.addSalesProducts(id, sale.productId, sale.quantity)));
  return {
    id,
    itemsSold: createNewSale,
  }; 
};
// O método map() invoca a função callback passada por argumento 
// para cada elemento do Array e devolve um novo Array como resultado.

const getAllSales = async () => {
  const results = await salesModels.getAllSales();

  if (!results) return [];

    const result = (results.map(
    ({ sale_id: saleId, date, product_id: productId, quantity }) => ({
      saleId,
      date,
      productId,
      quantity,
    }),
  ));
  return result;
};

const getByIdSales = async (id) => {
  const results = await salesModels.getByIdSales(id);

  if (!results) return [];

    const result = (results.map(
    ({ date, product_id: productId, quantity }) => ({
      date,
      productId,
      quantity,
    }),
  ));
  return result;
};

module.exports = {
  addSalesValidations,
  addSalesProducts,
  getAllSales,
  getByIdSales,
};