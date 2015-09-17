'use strict';

describe('Controller: CheckoutCtrl', function () {

  // load the controller's module
  beforeEach(module('shopnxApp'));

  var CheckoutCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CheckoutCtrl = $controller('CheckoutCtrl', {
      $scope: scope
    });
  }));

});
