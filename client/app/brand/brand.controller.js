'use strict';

angular.module('angularFullstackApp')
  .controller('BrandCtrl', function ($scope, socket, Brand, Modal, toastr) {

    var columns = ['name','info','parent','image'];

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
    $scope.edit = function(item) {
      var title; if(item) title = 'Editing ' + item.name; else title = 'Add New';
      var modalInstance = Modal.show(item,{title:title, api:'Brand', columns: columns});
    };

    $scope.delete = Modal.delete(function(item) {
      Brand.delete({id:item._id});
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('brand');
    });
  });
