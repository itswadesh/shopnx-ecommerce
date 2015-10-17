'use strict';

angular.module('shopnxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('feature', {
        url: '/feature',
        templateUrl: 'app/feature/feature.html',
        controller: 'FeatureCtrl'
      });
  });