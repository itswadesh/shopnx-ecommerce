'use strict';

angular.module('shopnxApp')
  .controller('AdminCtrl', function ($scope, PaymentMethods, Setting, toastr) {

    $scope.errors = {};
    $scope.settings = {};
    PaymentMethods.query({},function(res){
      $scope.payment = res[0];
    });
    // Shipping
    Setting.query({},function(res){
      $scope.settings = res[0];
    });
    $scope.saveSettings = function(settings) {
      $scope.submitted = true;
      if(settings._id) {
          Setting.update({ id:settings._id }, settings).$promise.then(function(res) {
            $scope.message = 'Shipping settings saved successfully.';
          }, function(error) { // error handler
            console.log(error);
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
		};
    // $scope.savePaypal = function(settings) {
    //   $scope.submitted = true;
    //   if(settings._id) {
    //       Setting.update({ id:settings._id }, settings).$promise.then(function(res) {
    //         $scope.message = 'Payment Method saved successfully.';
    //       }, function(error) { // error handler
    //         console.log(error);
    //         settings.paypal.$setValidity('mongoose', false);
    //         $scope.errors.other = 'Incorrect payment method';
    //         $scope.message = '';
    //         if(error.data.errors){
    //           var err = error.data.errors;
    //           toastr.error(err[Object.keys(err)].message,err[Object.keys(err)].name);
    //         }
    //         else{
    //           var msg = error.data.message;
    //           toastr.error(msg);
    //         }
    //       });
    //   }
		// };
  });
