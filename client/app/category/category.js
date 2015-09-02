'use strict';

angular.module('angularFullstackApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('category', {
        url: '/category',
        templateUrl: 'app/category/category.html',
        controller: 'CategoryCtrl'
      });
  });