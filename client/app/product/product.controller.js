'use strict';

angular.module('angularFullstackApp')
  .controller('ProductCtrl', function ($scope, socket, Product, Modal) {
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

    // $scope.editProduct = Modal.details(function(product) {
    //   console.log(product);
    //   Product.update({ id:product._id }, product);
    //   $scope.product = {};
    // });
        //  modalInstance.result.then(function (person) {
            //  selectedPerson = person;
        //  });


      // ModalService.trigger;

      // var modalOptions = {
      //       closeButtonText: 'Cancel??',
      //       actionButtonText: 'Delete Customer',
      //       header: 'Delete ?',
      //       body: 'Are you sure you want to delete this customer?',
      //       items: product
      //   };

        // modalService.show(product,modalOptions);
        // .then(function (result) {
          // console.log(result);
            // dataService.deleteCustomer($scope.customer.id).then(function () {
            //     $location.path('/customers');
            // }, processError);
        // });

      // Product.update({ id:product._id }, product);
      // $scope.product = {};


        // modalService.showModal({}, modalOptions).then(function (result) {
        //     console.log(result);
        // });


    // $scope.openProduct = Modal.details(function(product) {
      // Product.delete({id:product._id});
    // });

  });
