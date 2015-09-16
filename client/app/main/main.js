'use strict';

angular.module('shopnxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        title: 'Shop for your daily grocery online',
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        params: {
          sort: null
        }
      })
      .state('productDetail', {
        title: 'Details of selected product',
        params: {
          id: null,
          slug: null
        },
        url: '/p/:slug',
        templateUrl: 'app/main/product-details.html',
        controller: 'ProductDetailsCtrl'
      });
      // .state('SubProduct', {
      //   url: '/:page/:slug/:_id',
      //   templateUrl: 'app/main/main.html',
      //   controller: 'MainCtrl',
      //   params: {
      //     id: null,
      //     sort: null,
      //     brand: null,
      //     category: null,
      //     price1: 0,
      //     price2: 100000
      //   }
      // })
      // .state('SubProduct1', {
      //   url: '/:page/:slug/:_id/:sort',
      //   templateUrl: 'app/main/main.html',
      //   controller: 'MainCtrl'
      // });
  });
