'use strict';

angular.module('shopnxApp')
  .controller('NavbarCtrl', ['$scope', '$rootScope', '$location', 'Auth', '$modal', 'Cart', 'Category', 'Brand', 'SortOptions', '$q', 'Product', '$state', function ($scope, $rootScope, $location, Auth, $modal, Cart, Category, Brand,SortOptions,$q, Product, $state) {
    $scope.hideSubMenu = function(){
      // $('.megamenu .dropdown:hover .dropdown-menu').hide(); // Hide the navbar submenu once a category is selected
    }
    $rootScope.cart = Cart.cart;
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $rootScope.brands = Brand.query({active:true});
    $rootScope.sortOptions = SortOptions.server;

    $scope.isCollapsed = true;
    $scope.isCollapsed1 = true;
    $rootScope.isLoggedIn = Auth.isLoggedIn;
    $rootScope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $rootScope.checkCart = function(id){
        if(!_.contains($scope.cart.skuArray, id)){
            return true;
        }else{
            return false;
        }
    };

    $rootScope.getQuantity = function(sku){
        for(var i = 0;i<$scope.cart.items.length;i++){
            if($scope.cart.items[i].sku === sku){
              return $scope.cart.items[i].quantity;
            }
        }
    };

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.onSelectProduct = function($item){
        $state.go('productDetail', {id:$item._id, slug:$item.slug}, {reload: false});
        $scope.search = '';
    };

    $scope.categories = Category.all.query();

// // Script which calls all category from parent 0 and constructs the category hierarchy
// // This was moved to the server and now 1 call does it all instead 1 for each parent category + 1 for parent category itself
// var p = [];
// Category.parent.query({id:0},function(parents){
//     angular.forEach(parents,function(a){
//         a.children = [];
//         Category.parent.query({id:a.category},function(children){
//           a.children = children;
//         });
//         p.push(a);
//     });
//         $scope.categories = p;
//         // console.log(p);
// });

    $scope.globalSearch = function(input){
          input = input.toLowerCase();
            var defer = $q.defer();
            if (input){
                Product.query({where:{nameLower: {'$regex': input}}, limit:10, select: {id: 1, name:1, slug: 1}},
                    function(data){
                          console.log(data);
                        if (!$scope.$$phase){ //check if digest is not in progress
                            $rootScope.$apply(function(){
                                defer.resolve(data);
                            });
                        } else {
                            defer.resolve(data);
                        }
                    },
                    function(response){
                        if (!$scope.$$phase){
                            $rootScope.$apply(function(){
                                defer.reject('Server rejected with status ' + response.status);
                            });
                        } else {
                            defer.reject('Server rejected with status ' + response.status);
                        }
                    });
            } else {
                if (!$scope.$$phase){
                    $rootScope.$apply(function(){
                        defer.reject('No search query ');
                        // $log.info('No search query provided');
                    });
                } else {
                    defer.reject('No search query ');
                    // $log.info('No search query provided');
                }
            }
            return defer.promise;
        };

        $scope.openCart = function (cart) {
            cart = $scope.cart = cart;
            // console.log(cart);

            var modalOptions = {
                templateUrl: 'app/cart/cart.html',
                controller: cartEditCtrl,
                controllerAs: 'modal',
                windowClass: 'ab-modal-window',
                resolve: {
                    cart: function () { return cart; },
                }
            };
            $modal.open(modalOptions);

        };
        var cartEditCtrl = function ($scope, $modalInstance, cart) {
            $scope.cart = cart;
            $scope.cancel = function () {
                $modalInstance.dismiss('Close');
            };
        };
        cartEditCtrl.$inject = ['$scope', '$modalInstance', 'cart'];
  }]);
