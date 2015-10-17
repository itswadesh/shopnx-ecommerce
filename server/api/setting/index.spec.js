'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var settingCtrlStub = {
  index: 'settingCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var settingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './setting.controller': settingCtrlStub
});

describe('Setting API Router:', function() {

  it('should return an express router instance', function() {
    settingIndex.should.equal(routerStub);
  });

  describe('GET /api/settings', function() {

    it('should route to setting.controller.index', function() {
      routerStub.get
        .withArgs('/', 'settingCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
