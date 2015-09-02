'use strict';

angular.module('angularFullstackApp')
  .controller('InventoryCtrl', function ($scope, socket, Product, Modal) {
    $scope.products = [];

    var products = $scope.products =
    Product.query(function(products) {
      socket.syncUpdates('product', $scope.products);
    });

    $scope.addProduct = function() {
      if($scope.product === '')
        return;
      Product.save($scope.product);
      $scope.product = {};
    };

    $scope.editProduct = function(product) {
      var modalInstance = Modal.show(product,{title:product.name});
    };
    $scope.deleteProduct = Modal.delete(function(product) {
      Product.delete({id:product._id});
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('product');
    });

  });
