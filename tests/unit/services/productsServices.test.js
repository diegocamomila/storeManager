const sinon = require('sinon');
const { expect } = require('chai');
const productsServices = require('../../../services/productsServices');
const  productsModels  = require('../../../models/productsModels');


// Testa a função productsServices.js/getAll
describe('Busca por todos os produtos do banco ', () => {
  describe('Quando não existe produto cadastrado', () => {

    const mochProductsModels = [[]]; 

    before(()=>{ 
      sinon.stub(productsModels, 'execute').resolves(mochProductsModels); 
    });

    after(()=>{
      productsModels.execute.restore(); 
    });

    it('Retorna um array', async () => {
      const result = await productsServices.getAll();
      expect(result).to.be.an('array');
    });

    it('Retorna um array vazio', async () => {
      const result = await productsServices.getAll();
      expect(result).to.be.empty;
    });
  });

  describe('Quando existir produto cadastrado', () => {
    const mochProductsModels = [
      {
       " id": 1,
        "name": 'Martelo de Thor'
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
      },
    ];
    
    before(async () => {
      sinon.stub(connection, 'execute').resolves([mochProductsModels]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Retorna um array', async () => {
      const result = await productsServices.getAll();
      expect(result).to.be.an('array');
    });

    it('Todos os itens do array saodo  tipo "objeto"', async () => {
      const result = await productsServices.getAll();
      result.map(item => {
        expect(item).to.be.an('object');
      });
    });

    it('Dentro dos objetos contem keys "Id" e "name"', async () => {
      const result = await productsServices.getAll();
      result.map(item => {
        expect(item).to.include.all.keys('id', 'name');
      })
    });
  });
});