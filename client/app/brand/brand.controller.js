'use strict';

angular.module('angularFullstackApp')
  .controller('BrandCtrl', function ($scope, socket, Brand, Modal) {
    $scope.brands = [];

    var brands = $scope.brands =
    Brand.query(function(brands) {
      socket.syncUpdates('brand', $scope.brands);
    });
    $scope.changeActive = function(b){
      b.active = !b.active;
      Brand.update({ id:b._id }, b);
    };
    $scope.add = function() {
      var brandsModel = {name: '', info: '', parent: 0, image: '', uid: 0, active: true};
      var modalInstance = Modal.show(brandsModel,{title:'Add New', api:'Brand'});
      // if($scope.brand === '')
      //   return;
      // Brand.save($scope.brand);
      // $scope.brand = {};
    };

    $scope.edit = function(brand) {
      var modalInstance = Modal.show(brand,{title:brand.name,api:'Brand'});
    };
    $scope.delete = Modal.delete(function(brand) {
      Brand.delete({id:brand._id});
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('brand');
    });
  });
