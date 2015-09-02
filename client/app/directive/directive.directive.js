'use strict';

angular.module('angularFullstackApp')
  .directive('directive', function () {
    return {
      template: '<div></div>',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        element.text('this is the directive directive');
      }
    }})

.directive('modalWindow', function ($timeout) {
  return {
    priority: 1,
    link: function (scope, element, attrs) {
      $timeout(function () {
        console.log(element[0].querySelector('[autofocus]'));
        element[0].querySelector('[autofocus]').focus();
      });
    }
  };
})
/*
.directive('ngFocus', function($timeout) {
    return {
        link: function ( scope, element, attrs ) {
            scope.$watch( attrs.ngFocus, function ( val ) {
                if ( angular.isDefined( val ) && val ) {
                    $timeout( function () { element[0].focus(); } );
                }
            }, true);

            element.bind('blur', function () {
                if ( angular.isDefined( attrs.ngFocusLost ) ) {
                    scope.$apply( attrs.ngFocusLost );

                }
            });
        }
    };
});*/

.directive('checklistModel', ['$parse', '$compile', function($parse, $compile) {
  // contains
  function contains(arr, item) {
    if (angular.isArray(arr)) {
      for (var i = 0; i < arr.length; i++) {
        if (angular.equals(arr[i], item)) {
          return true;
        }
      }
    }
    return false;
  }

  // add
  function add(arr, item) {
    arr = angular.isArray(arr) ? arr : [];
    for (var i = 0; i < arr.length; i++) {
      if (angular.equals(arr[i], item)) {
        return arr;
      }
    }
    arr.push(item);
    return arr;
  }

  // remove
  function remove(arr, item) {
    if (angular.isArray(arr)) {
      for (var i = 0; i < arr.length; i++) {
        if (angular.equals(arr[i], item)) {
          arr.splice(i, 1);
          break;
        }
      }
    }
    return arr;
  }

  function postLinkFn(scope, elem, attrs) {
    // compile with `ng-model` pointing to `checked`
    $compile(elem)(scope);

    // getter / setter for original model
    var getter = $parse(attrs.checklistModel);
    var setter = getter.assign;

    // value added to list
    var value = $parse(attrs.checklistValue)(scope.$parent);

    // watch UI checked change
    scope.$watch('checked', function(newValue, oldValue) {
      if (newValue === oldValue) {
        return;
      }
      var current = getter(scope.$parent);
      if (newValue === true) {
        setter(scope.$parent, add(current, value));
      } else {
        setter(scope.$parent, remove(current, value));
      }
    });

    // watch original model change
    scope.$parent.$watch(attrs.checklistModel, function(newArr, oldArr) {
      scope.checked = contains(newArr, value);
    }, true);
  }

  return {
    restrict: 'A',
    priority: 1000,
    terminal: true,
    scope: true,
    compile: function(tElement, tAttrs) {
      if (tElement[0].tagName !== 'INPUT' || !tElement.attr('type', 'checkbox')) {
        throw 'checklist-model should be applied to `input[type="checkbox"]`.';
      }

      if (!tAttrs.checklistValue) {
        throw 'You should provide `checklist-value`.';
      }

      // exclude recursion
      tElement.removeAttr('checklist-model');

      // local scope var storing individual checkbox model
      tElement.attr('ng-model', 'checked');

      return postLinkFn;
    }
  };
}])


.directive('autoFillCustomer',function(Customer) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs,ctrl) {
            scope.$watch(attrs.ngModel, function (val) {
                if(val){
                // ctrl.$setValidity('phoneLoading', false);
                Customer.findOne({filter:{where:{phone:val}}}).then(function (data) {
                  if(data){
                    var customer = data.data[0];
                    scope.customer.name = customer.name;
                    scope.customer.email = customer.email;
                    scope.customer.address = customer.address;
                    scope.customer.city = customer.city;
                    ctrl.$setValidity('isCustomer', true);
                  }else{
                    ctrl.$setValidity('isCustomer', false);
                  }
                });
              }else{
                    ctrl.$setValidity('isCustomer', false);
                    scope.customer = '';
              }
            });
        }
    }

})

.directive('sortableColumns', [function () {
    return {
        restrict:'A',
        replace:true,
        templateUrl:"views/sortable-columns.tpl.html",
        scope:{
            columns:"=",
            itemsToSort:"="
        },
        link:function(scope,elm,attr){
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
                        case "number":
                            return Number(obj[column.predicate]);
                        case "date":
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
    }

}])
.directive('formElement', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            label : "@",
            model : "="
        },
        link: function(scope, element, attrs) {
            scope.disabled = attrs.hasOwnProperty('disabled');
            scope.required = attrs.hasOwnProperty('required');
            scope.pattern = attrs.pattern || '.*';
        },
        template: '<div class="form-group"><label class="col-sm-3 control-label no-padding-right" >  {{label}}</label><div class="col-sm-7"><span class="block input-icon input-icon-right" ng-transclude></span></div></div>'
      };

})

.directive('onlyNumbers', function() {
    return function(scope, element, attrs) {
        var keyCode = [8,9,13,37,39,46,48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105,110,190];
        element.bind("keydown", function(event) {
            if($.inArray(event.which,keyCode) == -1) {
                scope.$apply(function(){
                    scope.$eval(attrs.onlyNum);
                    event.preventDefault();
                });
                event.preventDefault();
            }

        });
    };
})

/*.directive('focus', function() {
    return function(scope, element) {
        element[0].focus();
    }
});*/
.directive('animateOnChange', function($animate) {
  return function(scope, elem, attr) {
      scope.$watch(attr.animateOnChange, function(nv,ov) {
        if (nv!=ov) {
              var c = 'change-up';
              $animate.addClass(elem,c, function() {
              $animate.removeClass(elem,c);
          });
        }
      });
  }
})

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
                if(e2!=null)
                return e1 == e2;
            };
            scope.$watch(checker, function (n) {

                //set the form control to valid if both
                //passwords are the same, else invalid
                control.$setValidity("passwordNoMatch", n);
            });
        }
    };
}]);
