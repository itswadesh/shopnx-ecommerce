'use strict';

describe('Controller: InventoryCtrl', function () {

  // load the controller's module
  beforeEach(module('shopnxApp'));

  var InventoryCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InventoryCtrl = $controller('InventoryCtrl', {
      $scope: scope
    });
  }));

});
