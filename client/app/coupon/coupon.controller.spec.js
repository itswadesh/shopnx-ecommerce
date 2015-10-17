'use strict';

describe('Controller: CouponCtrl', function () {

  // load the controller's module
  beforeEach(module('shopnxApp'));

  var CouponCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CouponCtrl = $controller('CouponCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
