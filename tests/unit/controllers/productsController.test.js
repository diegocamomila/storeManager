const sinon = require('sinon');
const { expect } = require('chai');
const productsControllers = require('../../../controllers/productsControllers');
const  productsServices  = require('../../../services/productsServices');

// Testa função productsControllers.js/getAll
describe('Busca por todos produtos no banco (controllers)', () => {
  describe('Quando não existem produtos cadastrado', () => {
    const res = {}
    const req = {}

    beforeEach(() => {
      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();
      sinon.stub(productsServices, 'getById').resolves(false);
    });

    afterEach(() => {
      productsServices.getById.restore();
    });

    it("Retorna status 404", async () => {
      await productsControllers.getById(req, res);
      expect(res.status.calledWith(404)).to.be.equal(true);
    });

    // it('retorna um  json com strings "product not found"', async () => {
    //   await productsControllers.getById(req, res);
    //   expect(response.send.calledWith({message: 'Product not found'})).to.be.equal(true);
    // });
  });
  
  describe('Quando existem produtos no banco', () => {
    const res = {};
    const req = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();
      sinon.stub(productsServices, 'getAll').resolves(true);
    });

    after(() => {
      productsServices.getAll.restore();
    });

    it(' Retorna status 200', async () => {
      await productsControllers.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('Retorna um JSON de objetos', async () => {
      await productsControllers.getAll(req, res);

      expect(res).to.be.a('object');
    });

  });
});