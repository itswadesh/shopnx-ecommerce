'use strict';

angular.module('shopnxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('paymentMethod', {
        title: 'Define payment Methods',
        url: '/paymentMethod',
        templateUrl: 'app/paymentMethod/paymentMethod.html',
        controller: 'PaymentMethodCtrl'
      });
  });
