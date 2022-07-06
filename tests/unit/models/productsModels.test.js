const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../models/connction');

// Testa a função productsModels.js/getAll
describe('Busca por todos os produtos do banco ', () => {
  describe('Quando não existe produto cadastrado', () => {

    const rowsQuery = [[]]; 

    before(()=>{ 
      sinon.stub(connection, 'execute').resolves(rowsQuery); 
    });

    after(()=>{
      connection.execute.restore(); 
    });

    it('Retorna um array', async () => {
      const result = await productsModels.getAll();
      expect(result).to.be.an('array');
    });

    it('Retorna um array vazio', async () => {
      const result = await productsModels.getAll();
      expect(result).to.be.empty;
    });
  });

  describe('Quando existir produto cadastrado', () => {
    const rowsQuery = [
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
      sinon.stub(connection, 'execute').resolves([rowsQuery]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Retorna um array', async () => {
      const result = await productsModels.getAll();
      expect(result).to.be.an('array');
    });

    it('Todos os itens do array saodo  tipo "objeto"', async () => {
      const result = await productsModels.getAll();
      result.map(item => {
        expect(item).to.be.an('object');
      });
    });

    it('Denro dos objetos contem keys "Id" e "name"', async () => {
      const result = await productsModels.getAll();
      result.map(item => {
        expect(item).to.include.all.keys('id', 'name');
      })
    });
  });
});