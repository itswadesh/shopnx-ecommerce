'use strict';

angular.module('shopnxApp')
  .controller('CheckoutCtrl', function ($scope, Order, PaymentMethod, Shipping, Coupon, Country) {
      $scope.msg = 'No items in cart.';
      $scope.customer = {};
      $scope.coupon = {};

      Country.query().$promise.then(function(res){
        $scope.countries = res;
      });

      PaymentMethod.active.query().$promise.then(function(res){
        $scope.paymentMethods = res;
        $scope.customer.paymentMethod = res[0];
      });

      Shipping.best.query({},function(res){
        $scope.shipping = res[0];
      });

      $scope.calculateShipping = function(country){
        Shipping.best.query({country:country.name},function(res){
          console.log(res);
          $scope.shipping = res[0];
        });
      };

      $scope.placeOrder = function(cart){
        var data = {phone:$scope.customer.phone, name:$scope.customer.name, address:$scope.customer.address, city:$scope.customer.city, payment:'Pending', items:cart};
        Order.save(data);
        $scope.msg = 'Processing Payment ...';
      };

      $scope.removeCoupon = function(){
        $scope.coupon = {};
      };
      $scope.checkCoupon = function(code, cartValue){
        var x = {};
        // x.where is required else it adds unneccessery colons which can not be parsed by the JSON parser at the Server
        x.where = {code:code,active:true,'minimumCartValue' : { $lte: cartValue } };

        Coupon.query(x, function(res){
          $scope.coupon = res[0];
        });

      };
  });
