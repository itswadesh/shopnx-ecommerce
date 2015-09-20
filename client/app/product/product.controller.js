'use strict';

angular.module('shopnxApp')
  .controller('ProductCtrl', function ($scope, socket, Product, Category, Brand, Modal, toastr) {
    var cols = [
      {heading:'sku',dataType:'text', sortType:'lowercase'},
      {heading:'name',dataType:'text', sortType:'lowercase'},
      {heading:'nameLower',dataType:'text', sortType:'lowercase'},
      {heading:'slug',dataType:'text', sortType:'lowercase'},
      {heading:'status',dataType:'text', sortType:'lowercase'},
      {heading:'info',dataType:'text', sortType:'lowercase'},
      {heading:'uid',dataType:'text', sortType:'lowercase'},
      {heading:'active',dataType:'boolean', sortType:'lowercase'},
      {heading:'img',dataType:'text', sortType:'lowercase'}
    ];
    // var cols = ['sku','name','nameLower','slug','status','info','uid', 'active','img'];
    $scope.products = [];
    $scope.product = {};
    $scope.variant = {};
    $scope.product.variants = [];
    // $scope.subcategories = [];
    $scope.products =Product.query(function() {
      // console.log(data);
      socket.syncUpdates('product', $scope.data);
    });

    $scope.categories = Category.query(function() {
      socket.syncUpdates('category', $scope.data);
    });
    $scope.brands = Brand.query(function() {
      socket.syncUpdates('brand', $scope.data);
    });
    $scope.edit = function(product) {
      var title; if(product.name){ title = 'Editing ' + product.name;} else{ title = 'Add New';}
      Modal.show(product,{title:title, api:'Product', columns: cols});
    };
    $scope.save = function(product){
      if('variants' in $scope.product){
      }else{
          $scope.product.variants = [];
      }
      if('size' in $scope.variant){
        $scope.product.variants.push($scope.variant);
      }
      $scope.variant = {};
      if('_id' in product){
          Product.update({ id:$scope.product._id }, $scope.product).$promise.then(function() {
// console.log(res);
          }, function(error) { // error handler
            // console.log(error,err);
            var err = error.data.errors;
            toastr.error(err[Object.keys(err)].message,err[Object.keys(err)].name);
          });
        }
        else{
          Product.save($scope.product).$promise.then(function() {

          }, function(error) { // error handler
              var err = error.data.errors;
              // console.log(error,err);
              toastr.error(err[Object.keys(err)].message,err[Object.keys(err)].name);
          });
        }
    };
    $scope.changeActive = function(b){ // success handler
      b.active = !b.active;
      Product.update({ id:b._id }, b).$promise.then(function() {

      }, function(error) { // error handler
          // console.log(error);
          toastr.error(error.statusText + ' (' +  error.status + ')');
          b.active = !b.active;
      });
    };

    $scope.delete = function(product) {
      Product.delete({id:product._id});
    };

    $scope.productDetail = function(product){
        if(product){ $scope.product = product; }
        else{ $scope.product = {}; }
    };

  });
