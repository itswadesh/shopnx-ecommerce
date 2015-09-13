'use strict';

angular.module('shopnxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        params: {
          sort: null
        }
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
        controller: 'MainCtrl',
        params: {
          id: null,
          sort: null,
          brand: null,
          category: null,
          price1: 0,
          price2: 100000
        }
      })
      .state('SubProduct1', {
        url: '/:page/:slug/:_id/:sort',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
      // .state('ProductBrand', {
      //   url: '/brand/:slug/:_id',
      //   templateUrl: 'app/main/main.html',
      //   controller: 'ProductBrandCtrl'
      // });
  });
