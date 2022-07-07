const sinon = require('sinon');
const { expect } = require('chai');
const productsControllers = require('../../../controllers/productsControllers');
const  productsServices  = require('../../../services/productsServices');

// Testa função productsControllers.js/getAll
describe('Busca por todos produtos no banco (controllers)', () => {
  describe('Quando não existem produtos cadastrado', ()=>{
    const res = {}
    const req = {}
    const nextSpy = sinon.spy() // https://imasters.com.br/front-end/testes-em-javascript-diferenca-entre-fake-spy-stub-e-mock
    const erro = { status:404, message:'Products not found'}

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getAll').throws(erro);
    })

    afterEach(() => {
      productsServices.getAll.restore();
    })

    it('é chamado o next', async() => {
      await productsControllers.getAll(req, res, nextSpy);
      expect(nextSpy.calledWith(erro)).to.be.equal(true);
    })
  })
  
  describe('Quando existem produtos no banco', () => {
    const res = {};
    const req = {};

    const mochProductsServices = [
      {
        "id": 1,
        "name": "Martelo de Thor"
      }
    ];

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getAll').resolves([mochProductsServices]);
    })

    after(() => {
      productsServices.getAll.restore();
    });

    it(' Retorna status 200', async () => {
      await productsControllers.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('Retorna um JSON com array', async () => {
      await productsControllers.getAll(req, res);

      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });

  });
});