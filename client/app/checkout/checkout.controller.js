'use strict';

angular.module('shopnxApp')
  .controller('CheckoutCtrl', function ($scope, Order) {
      $scope.msg = "No items in cart.";
      $scope.placeOrder = function(cart){
        var data = {phone:$scope.customer.phone, name:$scope.customer.name, address:$scope.customer.address, city:$scope.customer.city, payment:'Pending', items:cart};
        Order.save(data);
        $scope.msg = "Processing Payment ...";
      };
  });
