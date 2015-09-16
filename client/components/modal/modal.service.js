'use strict';

angular.module('shopnxApp')
.factory('Modal', function ($rootScope, $modal) {

  var obj = {};
  obj.selectModalInstanceCtrl = function ($scope,$modalInstance, $injector, data, options, toastr) {
    var api = $injector.get(options.api);
    $scope.data = angular.copy(data);
    $scope.options = options;
    $scope.saveItem = function(item){
        if($scope.data._id)
          api.update({ id:$scope.data._id }, $scope.data).$promise.then(function(res) {

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
        else
          api.save($scope.data).$promise.then(function(res) {

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
        $modalInstance.close(item);
    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
  };

  obj.show = function(data,options){
    // del = del || angular.noop;
      var modalOptions = {
          templateUrl: "components/modal/detail-modal.html",
          controller: obj.selectModalInstanceCtrl,
          controllerAs: "modal",
          windowClass: "ab-modal-window",
          resolve: {
              data: function () { return data; },
              options :  function () { return options; }
          }
      };
      var modalInstance = $modal.open(modalOptions);
  };

  return obj;


    function openModal(scope, modalClass,template) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';

      angular.extend(modalScope, scope);

      return $modal.open({
        templateUrl: 'components/modal/'+template,
        windowClass: modalClass,
        scope: modalScope
      });
    };

});
