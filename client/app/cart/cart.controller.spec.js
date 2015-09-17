'use strict';

describe('Controller: CartCtrl', function () {

  // load the controller's module
  beforeEach(module('shopnxApp'));

  var CartCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CartCtrl = $controller('CartCtrl', {
      $scope: scope
    });
  }));

});
