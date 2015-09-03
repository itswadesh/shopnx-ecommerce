'use strict';

angular.module('angularFullstackApp')
  .controller('CategoryCtrl', function ($scope) { //, socket, Category, Modal, toastr
    //
    // var columns = ['name','info','parent','image'];
    //
    // $scope.category = [];
    // var category = $scope.category =
    // Category.query(function(category) {
    //   socket.syncUpdates('category', $scope.category);
    // });
    // $scope.changeActive = function(b){ // success handler
    //   b.active = !b.active;
    //   Category.update({ id:b._id }, b).$promise.then(function(data) {
    //
    //   }, function(error) { // error handler
    //       console.log(error);
    //       toastr.error(error.statusText + ' (' +  error.status + ')');
    //       b.active = !b.active;
    //   });
    // };
    // $scope.edit = function(item) {
    //   var title; if(item) title = 'Editing ' + item.name; else title = 'Add New';
    //   var modalInstance = Modal.show(item,{title:title, api:'Category', columns: columns});
    // };
    //
    // $scope.delete = Modal.delete(function(item) {
    //   Category.delete({id:item._id});
    // });
    //
    // $scope.$on('$destroy', function () {
    //   socket.unsyncUpdates('category');
    // });
  });
