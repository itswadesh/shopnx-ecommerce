'use strict';

describe('Controller: ShippingCtrl', function () {

  // load the controller's module
  beforeEach(module('shopnxApp'));

  var ShippingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShippingCtrl = $controller('ShippingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
