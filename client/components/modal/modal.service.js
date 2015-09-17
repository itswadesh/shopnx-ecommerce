'use strict';

angular.module('shopnxApp')
.factory('Modal',['$rootScope','$modal', function ($rootScope, $modal) {

  var obj = {};
  var selectModalInstanceCtrl = function ($scope,$modalInstance, $injector, data, options, toastr) {
    var api = $injector.get(options.api);
    $scope.data = angular.copy(data);
    $scope.options = options;
    $scope.saveItem = function(item){
        if($scope.data._id){
          api.update({ id:$scope.data._id }, $scope.data).$promise.then(function() {

          }, function(error) { // error handler
            if(error.data.errors){
              var err = error.data.errors;
              toastr.error(err[Object.keys(err)].message,err[Object.keys(err)].name);
            }
            else{
              var msg = error.data.message;
              toastr.error(msg);
            }
          });
        }
        else{
          api.save($scope.data).$promise.then(function() {

          }, function(error) { // error handler
            if(error.data.errors){
              var err = error.data.errors;
              toastr.error(err[Object.keys(err)].message,err[Object.keys(err)].name);
            }
            else{
              var msg = error.data.message;
              toastr.error(msg);
            }
          });
        }
        $modalInstance.close(item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
  };

  // We need to manually inject to be minsafe
  selectModalInstanceCtrl.$inject = ['$scope', '$modalInstance', '$injector', 'data', 'options', 'toastr'];

  obj.show = function(data,options){
      var modalOptions = {
          templateUrl: 'components/modal/modal.html',
          controller: selectModalInstanceCtrl,
          controllerAs: 'modal',
          windowClass: 'modal-danger',
          resolve: {
              data: function () { return data; },
              options : function () { return options; }
          }
      };
      $modal.open(modalOptions);

  };

  return obj;

}]);
