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
      .state('underCategory', {
        url: '/:category/:slug/:_id',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('underBrand', {
        url: '/:brand/:slug/:_id',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
