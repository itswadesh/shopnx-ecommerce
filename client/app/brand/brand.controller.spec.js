'use strict';

describe('Controller: BrandCtrl', function () {

  // load the controller's module
  beforeEach(module('shopnxApp'));

  var BrandCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BrandCtrl = $controller('BrandCtrl', {
      $scope: scope
    });
  }));
  // 
  // it('should ...', function () {
  //   expect(true).toBe(true);
  // });
});
