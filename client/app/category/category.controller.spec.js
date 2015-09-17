'use strict';

describe('Controller: CategoryCtrl', function () {

  // load the controller's module
  beforeEach(module('shopnxApp'));

  var CategoryCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CategoryCtrl = $controller('CategoryCtrl', {
      $scope: scope
    });
  }));

});
