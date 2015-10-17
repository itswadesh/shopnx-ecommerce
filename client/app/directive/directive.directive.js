'use strict';

angular.module('shopnxApp')

  .directive('crudTable',['Modal','$injector','$loading','socket','toastr', function (Modal,$injector,$loading,socket,toastr) {
    return {
      templateUrl: 'app/directive/table.html',
      restrict: 'EA',
      scope: {obj:'='},
      link: function (scope, element, attrs) {
        // var cols = ['name','info','parent','image'];
        scope.title = attrs.api+'s';
        var cols = JSON.parse(attrs.cols);
        var obj = [];
        scope.noedit = attrs.noedit;
        scope.nodelete = attrs.nodelete;
        scope.noadd = attrs.noadd;
        // console.log();
        // scope.disabledColumn = attrs.disabledcolumn;
        angular.forEach(cols, function(o) {
          // var k,v;
          angular.forEach(o, function(v, k) {
            var v1;
            if(v==='number' || v==='float' || v==='integer' || v==='currency'){ v1 = 'parseFloat';}
            else{ v1 = 'lowercase';}
            obj.push({heading:k,dataType:v, sortType:v1});
          });
        });
        scope.cols = obj;
        // scope.Utils = {
        //    keys : Object.keys,
        //    values : Object.values
        // }
        var api = $injector.get(attrs.api);
        scope.data = [];
        // scope.loadingTable = true;
        $loading.start('crudTable');
        scope.data =api.query(function() {
          // scope.loadingTable = false;
          $loading.finish('crudTable');
          socket.syncUpdates(attrs.api.toLowerCase(), scope.data);
        });
        scope.edit = function(item) {
          var title; if(item._id){ title = 'Editing ' + item._id;} else{ title = 'Add New';}
          Modal.show(item,{title:title, api:attrs.api, columns: obj, disabledColumn: attrs.disabledcolumn});
        };
        scope.changeActive = function(b){ // success handler
          b.active = !b.active;
          api.update({ id:b._id }, b).$promise.then(function() {

          }, function(error) { // error handler
              console.log(error);
              toastr.error(error.statusText + ' (' +  error.status + ')');
              b.active = !b.active;
          });
        };

        scope.delete = function(item) {
          api.delete({id:item._id});
        };

        scope.$on('$destroy', function () {
          socket.unsyncUpdates(attrs.api.toLowerCase());
        });
      }
    };}])

.directive('modalWindow', ['$timeout', function ($timeout) {
  return {
    priority: 1,
    link: function (scope, element) {
      $timeout(function () {
        // var elem = element[0].querySelector('[autofocus]').focus();
        var elem = element[0].querySelector('input');
        if(elem){
          elem.focus();
        }
      });
    }
  };
}])

// .directive('checkCoupon',function(Coupon) {
//     return {
//         require: 'ngModel',
//         link: function(scope, element, attrs, ctrl) {
//             scope.$watch(attrs.ngModel, function (val) {
//             console.log(val);
//               if(val){
//               // ctrl.$setValidity('phoneLoading', false);
//               Coupon.get({id:val}, function (data) {
//                 if(data){
//                   var customer = data.data[0];
//                   scope.customer.name = customer.name;
//                   scope.customer.email = customer.email;
//                   scope.customer.address = customer.address;
//                   scope.customer.city = customer.city;
//                   ctrl.$setValidity('isCustomer', true);
//                 }else{
//                   ctrl.$setValidity('isCustomer', false);
//                 }
//               });
//             }else{
//                   ctrl.$setValidity('isCustomer', false);
//                   scope.customer = '';
//             }
//           });
//         }
//     };
//
// })

// .directive('autoFillCustomer',function(Customer) {
//     return {
//         require: 'ngModel',
//         link: function(scope, element, attrs,ctrl) {
//             scope.$watch(attrs.ngModel, function (val) {
//                 if(val){
//                 // ctrl.$setValidity('phoneLoading', false);
//                 Customer.findOne({filter:{where:{phone:val}}}).then(function (data) {
//                   if(data){
//                     var customer = data.data[0];
//                     scope.customer.name = customer.name;
//                     scope.customer.email = customer.email;
//                     scope.customer.address = customer.address;
//                     scope.customer.city = customer.city;
//                     ctrl.$setValidity('isCustomer', true);
//                   }else{
//                     ctrl.$setValidity('isCustomer', false);
//                   }
//                 });
//               }else{
//                     ctrl.$setValidity('isCustomer', false);
//                     scope.customer = '';
//               }
//             });
//         }
//     };
//
// })

.directive('sortableColumns', [function () {
    return {
        restrict:'A',
        replace:true,
        templateUrl:'views/sortable-columns.tpl.html',
        scope:{
            columns:'=',
            itemsToSort:'='
        },
        link:function(scope){
            scope.columnClicked = function(column){
                    if(scope.columns.columnToSort.predicate === column.predicate){
                        scope.columns.columnToSort.reverse = !scope.columns.columnToSort.reverse;
                    }else{
                        scope.columns.columnToSort = column;
                    }
                    scope.sortBy(scope.columns.columnToSort);
            };

            scope.sortBy = function(column){
              console.log(column);
                scope.itemsToSort = _.sortBy(scope.itemsToSort,function(obj){
                    switch (column.dataType){
                        case 'number':
                            return Number(obj[column.predicate]);
                        case 'date':
                            return new Date(obj[column.predicate]);
                        default:
                            return obj[column.predicate].toString();
                    }
                });

                if(column.reverse){
                    scope.itemsToSort = scope.itemsToSort.reverse();
                }
            };
            scope.columns.columnToSort = scope.columns[1];
            scope.sortBy(scope.columns.columnToSort);
        }
    };

}])
// .directive('formElement', function() {
//     return {
//         restrict: 'E',
//         transclude: true,
//         scope: {
//             label : '@',
//             model : '='
//         },
//         link: function(scope, element, attrs) {
//             scope.disabled = attrs.hasOwnProperty('disabled');
//             scope.required = attrs.hasOwnProperty('required');
//             scope.pattern = attrs.pattern || '.*';
//         },
//         template: '<div class="form-group"><label class="col-sm-3 control-label no-padding-right" >  {{label}}</label><div class="col-sm-7"><span class="block input-icon input-icon-right" ng-transclude></span></div></div>'
//       };
//
// })

.directive('onlyNumbers', function() {
    return function(scope, element, attrs) {
        var keyCode = [8,9,13,37,39,46,48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105,110,190];
        element.bind('keydown', function(event) {
            if($.inArray(event.which,keyCode) === -1) {
                scope.$apply(function(){
                    scope.$eval(attrs.onlyNum);
                    event.preventDefault();
                });
                event.preventDefault();
            }

        });
    };
})

// .directive('animateOnChange', function($animate) {
//   return function(scope, elem, attr) {
//       scope.$watch(attr.animateOnChange, function(nv,ov) {
//         if (nv!==ov) {
//               var c = 'change-up';
//               $animate.addClass(elem,c, function() {
//               $animate.removeClass(elem,c);
//           });
//         }
//       });
//   };
// })

.directive('passwordMatch', [function () {
    return {
        restrict: 'A',
        scope:true,
        require: 'ngModel',
        link: function (scope, elem , attrs,control) {
            var checker = function () {

                //get the value of the first password
                var e1 = scope.$eval(attrs.ngModel);

                //get the value of the other password
                var e2 = scope.$eval(attrs.passwordMatch);
                if(e2!==null){
                  return e1 === e2;
                }
            };
            scope.$watch(checker, function (n) {

                //set the form control to valid if both
                //passwords are the same, else invalid
                control.$setValidity('passwordNoMatch', n);
            });
        }
    };
}])
.directive('ngConfirmClick', ['$modal',
    function($modal) {

      var ModalInstanceCtrl = function($scope, $modalInstance) {
        $scope.ok = function() {
          $modalInstance.close();
        };

        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      };

      return {
        restrict: 'A',
        scope:{
          ngConfirmClick:'&',
          item:'='
        },
        link: function(scope, element, attrs) {
          element.bind('click', function() {
            var message = attrs.ngConfirmMessage || 'Are you sure to delete? ';

            /*
            //This works
            if (message && confirm(message)) {
              scope.$apply(attrs.ngConfirmClick);
            }
            //*/

            //*This doesn't works

            var modalHtml = '<div class="modal-header">Confirm Delete</div>';
            modalHtml += '<div class="modal-body">' + message + '</div>';
            modalHtml += '<div class="modal-footer"><button class="btn btn-danger" ng-click="ok()">Delete</button><button class="btn" ng-click="cancel()">Cancel</button></div>';

            var modalInstance = $modal.open({
              template: modalHtml,
              controller: ModalInstanceCtrl,
              windowClass: 'modal-danger'
            });

            modalInstance.result.then(function() {
              scope.ngConfirmClick({item:scope.item}); //raise an error : $digest already in progress
            }, function() {
              //Modal dismissed
            });
            //*/

          });

        }
      };
    }
  ])
  .directive('errSrc', [function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src !== attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  };
}]);
