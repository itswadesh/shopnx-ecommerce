'use strict';

angular.module('angularFullstackApp')
  .controller('BrandCtrl', function ($scope, socket, Brand, Modal, toastr) {

    var columns = ['name','info','parent'];

    $scope.brands = [];
    var brands = $scope.brands =
    Brand.query(function(brands) {
      socket.syncUpdates('brand', $scope.brands);
    });
    $scope.changeActive = function(b){ // success handler
      b.active = !b.active;
      Brand.update({ id:b._id }, b).$promise.then(function(data) {

      }, function(error) { // error handler
          console.log(error);
          toastr.error(error.statusText + ' (' +  error.status + ')');
          b.active = !b.active;
      });
    };
    $scope.add = function() {
      var brandsModel = {name: '', info: '', parent: 0, image: '', uid: 0, active: true};
      var modalInstance = Modal.show(brandsModel,{title:'Add New', api:'Brand', columns: columns});
    };

    $scope.edit = function(brand) {
      var modalInstance = Modal.show(brand,{title:brand.name,api:'Brand', columns: columns});
    };
    $scope.delete = Modal.delete(function(brand) {
      Brand.delete({id:brand._id});
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('brand');
    });
  });
