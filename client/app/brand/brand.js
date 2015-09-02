'use strict';

angular.module('angularFullstackApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('brand', {
        url: '/brand',
        templateUrl: 'app/brand/brand.html',
        controller: 'BrandCtrl'
      });
  });
