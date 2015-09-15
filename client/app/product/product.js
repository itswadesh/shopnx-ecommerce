'use strict';

angular.module('shopnxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('product', {
        data: {title: 'Home'},
        title: 'Products administration page',
        url: '/product',
        templateUrl: 'app/product/product.html',
        controller: 'ProductCtrl',
        authenticate: true,
        resolve: {
      // Constant title
      $title: function() { return 'Home'; }
    }
      });
  });
