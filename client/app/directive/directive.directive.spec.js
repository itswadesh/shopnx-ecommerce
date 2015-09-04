'use strict';

describe('Directive: directive', function () {

  // load the directive's module
  beforeEach(module('shopnxApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<directive></directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the directive directive');
  }));
});