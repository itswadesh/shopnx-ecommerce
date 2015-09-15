'use strict';

angular.module('shopnxApp')
  .controller('OrderCtrl', function ($scope, Order) {
    var orderStatusLov = $scope.orderStatusLov = Order.status;
    var orders = $scope.orders = Order.my.query({},function(res){
      var total=0;
      for(var i=0;i<res.length;i++){
          var subTotal = 0;
          for(var j=0;j<res[i].items.length;j++){
              subTotal += res[i].items[j].price * parseInt(res[i].items[j].quantity);
              total += res[i].items[j].price * parseInt(res[i].items[j].quantity);
          }
          res[i].subTotal = subTotal;
      }
      res.total = total;
    });
  });
