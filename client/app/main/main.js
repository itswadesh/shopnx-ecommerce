'use strict';

angular.module('shopnxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('productDetail', {
        params: {
          id: null,
          slug: null
        },
        url: '/p/:slug',
        templateUrl: 'app/main/product-details.html',
        controller: 'ProductDetailsCtrl'
      })
      .state('SubProduct', {
        url: '/:page/:slug/:_id',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'//'SubProductCtrl'
      });
      // .state('ProductBrand', {
      //   url: '/brand/:slug/:_id',
      //   templateUrl: 'app/main/main.html',
      //   controller: 'ProductBrandCtrl'
      // });
  });
