'use strict';

angular.module('angularFullstackApp')
.factory('Modal', function ($rootScope, $modal) {

  var obj = {};
  obj.selectModalInstanceCtrl = function ($scope,$modalInstance, $injector, product, options) {
    var api = $injector.get(options.api);
    $scope.product = angular.copy(product);
    $scope.options = options;

    $scope.saveItem = function(item){
        if($scope.product._id)
          api.update({ id:$scope.product._id }, $scope.product);
        else
          api.save($scope.product);
        $modalInstance.close(item);
    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
  };
  // obj.delete = function(del){
  //   del = del || angular.noop;
  //   return function() {
  //     var args = arguments[0],
  //         name = args.name,
  //     // var args = Array.prototype.slice.call(arguments),
  //         // name = args.shift(),
  //         deleteModal;
  //     console.log(arguments[0]);
  //
  //     deleteModal = openModal({
  //       modal: {
  //         dismissable: true,
  //         title: 'Confirm Delete',
  //         html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
  //         buttons: [{
  //           classes: 'btn-danger',
  //           text: 'Delete',
  //           click: function(e) {
  //             deleteModal.close(e);
  //           }
  //         }, {
  //           classes: 'btn-default',
  //           text: 'Cancel',
  //           click: function(e) {
  //             deleteModal.dismiss(e);
  //           }
  //         }]
  //       }
  //     }, 'modal-danger','modal.html');
  //
  //     deleteModal.result.then(function(event) {
  //       // console.log(event,args);
  //       return 'ok';
  //       del.apply(event, args);
  //     });
  //   };
  // };
  obj.show = function(product,options){
    // del = del || angular.noop;
      var modalOptions = {
          templateUrl: "components/modal/detail-modal.html",
          controller: obj.selectModalInstanceCtrl,
          controllerAs: "modal",
          windowClass: "ab-modal-window",
          resolve: {
              product: function () { return product; },
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

      // ,

//
//         details: function(item) {
//           item = item || angular.noop;
//           /**
//            * Open a delete confirmation modal
//            * @param  {String} name   - name or info to show on modal
//            * @param  {All}           - any additional args are passed straight to del callback
//            */
//           return function() {
//             var args = Array.prototype.slice.call(arguments),
//                 name = args.shift(),
//                 detailModal;
//
// var items = args[0];
// // var keys = Object.keys(item);
// delete items.__v;
// // delete item.dismissable;
//             detailModal = openModal({
//               modal: {
//                 dismissable: true,
//                 title: 'Detail Modal',
//                 // html: '<p>Details of <strong>' + name + '</strong> ?</p>',
//                 item: items,
//                 buttons: [{
//                   classes: 'btn-primary',
//                   text: 'Save',
//                   click: function(e) {
//                     detailModal.close(e);
//                   }
//                 }, {
//                   classes: 'btn-default',
//                   text: 'Cancel',
//                   click: function(e) {
//                     detailModal.dismiss(e);
//                   }
//                 }]
//               }
//             }, 'modal-danger','detail-modal.html');
//
//             detailModal.result.then(function(event) {
//               console.log(args);
//               // item.apply(event, args);
//             });
//           };
//         }
        // ,
        //
        // xxx: function(item) {
        //   return function() {
        //     var modalScope = $rootScope.$new();
        //     var modalClass = modalClass || 'modal-default';
        //     var modalInstance = $modal.open({
        //       // animation: $scope.animationsEnabled,
        //       templateUrl: 'components/modal/detail-modal.html',
        //       // controller: 'ModalInstanceCtrl',
        //       windowClass: modalClass,
        //       scope: modalScope,
        //       text: 'ssss',
        //       html: 'html',
        //       title: 'title',
        //       item: 'item',
        //       size: 'lg',
        //       resolve: {
        //         items: function () {
        //           return 'yy';//$scope.items;
        //         }
        //       }
        //     });
        //
        //     modalInstance.result.then(function (selectedItem) {
        //       $scope.selected = selectedItem;
        //     }, function () {
        //       $log.info('Modal dismissed at: ' + new Date());
        //     });
        //   };
        // },
        // yyy: function(item) {
        //   return function() {
        //     var modalScope = $rootScope.$new();
        //     var modalClass = modalClass || 'modal-default';
        //     var modalInstance = $modal.open({
        //       // animation: $scope.animationsEnabled,
        //       templateUrl: 'components/modal/detail-modal.html',
        //       // controller: 'ModalInstanceCtrl',
        //       windowClass: modalClass,
        //       scope: modalScope,
        //       text: 'ssss',
        //       html: 'html',
        //       title: 'title',
        //       item: 'item',
        //       size: 'lg',
        //       resolve: {
        //         items: function () {
        //           return 'yy';//$scope.items;
        //         }
        //       }
        //     });
        //
        //     modalInstance.result.then(function (selectedItem) {
        //       $scope.selected = selectedItem;
        //     }, function () {
        //       $log.info('Modal dismissed at: ' + new Date());
        //     });
        //   };
        // },
        // zzz: function(item){
        //
        // }

//
//   .factory('modalService2', function ($modal,$rootScope) {
//     var obj = {};
//     // obj.serviceBase = serviceBase;
//
//     obj.show = function (q,options) {
//       console.log(q);
//       var modalScope = $rootScope.$new();
//       modalScope.items = q;
//       var tempModalDefaults = {
//         animation: modalScope.animationsEnabled,
//         templateUrl: 'components/modal/detail-modal.html',
//         size: 'lg',
//         resolve: {
//           items: function () {
//             return modalScope.items;
//           }
//         }
//       };
//       tempModalDefaults.controller = function ($scope, $modalInstance) {
//           $scope.modal = tempModalDefaults;
//           $scope.modal.ok = function (result) {
//               $modalInstance.close(result);
//           };
//           $scope.modal.close = function (result) {
//               $modalInstance.dismiss('cancel');
//           };
//       }
//
//       var modalInstance = $modal.open(tempModalDefaults);
//
//       modalInstance.result.then(function (selectedItem) {
//         modalScope.selected = selectedItem;
//       }, function () {
//         console.log('Modal dismissed at: ' + new Date());
//       });
//     };
//     return obj;
// })
// .service('modalService', ['$modal',
//     function ($modal) {
//
//         var modalDefaults = {
//             backdrop: true,
//             keyboard: true,
//             modalFade: true,
//             templateUrl: 'components/modal/detail-modal.html'
//         };
//
//         var modal = {
//             closeButtonText: 'Close',
//             actionButtonText: 'OK',
//             title: 'Proceed?',
//             body: 'Perform this action?',
//             dismissable: true
//         };
//
//         this.showModal = function (customModalDefaults, customModalOptions) {
//             if (!customModalDefaults) customModalDefaults = {};
//             customModalDefaults.backdrop = 'static';
//             return this.show(customModalDefaults, customModalOptions);
//         };
//
//         this.show = function (customModalDefaults, customModalOptions) {
//             //Create temp objects to work with since we're in a singleton service
//             var tempModalDefaults = {};
//             var tempModalOptions = {};
//
//             //Map angular-ui modal custom defaults to modal defaults defined in service
//             angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);
//
//             //Map modal.html $scope custom properties to defaults defined in service
//             angular.extend(tempModalOptions, modal, customModalOptions);
//
//             if (!tempModalDefaults.controller) {
//                 tempModalDefaults.controller = function ($scope, $modalInstance) {
//                     $scope.modal = tempModalOptions;
//                     $scope.modal.ok = function (result) {
//                         console.log(result);
//                         $modalInstance.close(result);
//                     };
//                     $scope.modal.close = function (result) {
//                         $modalInstance.dismiss('cancel');
//                     };
//                 }
//             }
//             var res = $modal.open(tempModalDefaults).result;
//             // console.log($scope.modal.items);
//             return res;
//         };
//
//     }])
