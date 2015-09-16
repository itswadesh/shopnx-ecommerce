'use strict';

angular.module('shopnxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('product', {
        title: 'Products administration (Add, Remove, Edit)',
        url: '/product',
        templateUrl: 'app/product/product.html',
        controller: 'ProductCtrl',
        authenticate: true
      });
  });
