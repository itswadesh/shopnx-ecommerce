'use strict';

angular.module('shopnxApp')
  .controller('OrderCtrl', function ($scope, Order, toastr) {
    $scope.orderStatusLov = Order.status;
    $scope.orders = Order.my.query({},function(res){
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
    $scope.changeStatus = function(order){
      Order.update({ id:order._id }, order).$promise.then(function(res) {
        console.log(res);
      }, function(error) { // error handler
        console.log(error);
        if(error.data.errors){
          var err = error.data.errors;
          toastr.error(err[Object.keys(err)].message,err[Object.keys(err)].name);
        }
        else{
          var msg = error.data.message;
          toastr.error(msg);
        }
      });
    };
  });
