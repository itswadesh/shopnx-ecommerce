'use strict';

describe('Service: Cart', function () {

  // load the service's module
  beforeEach(module('shopnxApp'));

  // instantiate service
  var Cart;
  beforeEach(inject(function (_Cart_) {
    Cart = _Cart_;
  }));

  it('should do something', function () {
    expect(!!Cart).toBe(true);
  });

});
