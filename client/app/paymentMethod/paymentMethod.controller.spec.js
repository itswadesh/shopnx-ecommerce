'use strict';

describe('Controller: PaymentMethodCtrl', function () {

  // load the controller's module
  beforeEach(module('shopnxApp'));

  var PaymentMethodCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PaymentMethodCtrl = $controller('PaymentMethodCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
