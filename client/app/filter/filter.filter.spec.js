'use strict';

describe('Filter: filter', function () {

  // load the filter's module
  beforeEach(module('shopnxApp'));

  // initialize a new instance of the filter before each test
  var filter;
  beforeEach(inject(function ($filter) {
    filter = $filter('filter');
  }));

});
