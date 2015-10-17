'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var PaymentMethodCtrlStub = {
  index: 'PaymentMethodCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var PaymentMethodIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './PaymentMethod.controller': PaymentMethodCtrlStub
});

describe('PaymentMethod API Router:', function() {

  it('should return an express router instance', function() {
    PaymentMethodIndex.should.equal(routerStub);
  });

  describe('GET /api/PaymentMethods', function() {

    it('should route to PaymentMethod.controller.index', function() {
      routerStub.get
        .withArgs('/', 'PaymentMethodCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
