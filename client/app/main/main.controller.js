'use strict';

angular.module('shopnxApp')
  .controller('MainCtrl', function ($scope, $stateParams, $location, Product, Brand, Category, Cart, socket) {

    // below both lines get store and cart from service “MyService”
        // $scope.store = MyService.store;
        $scope.cart = Cart.cart;
        if ($stateParams.productSku != null) {
            $scope.product = $scope.store.getProduct($stateParams.productSku);
        }

    // console.log('StoreCtrl');
    if('brand' in $stateParams){
        var id = $stateParams.brand;
        $scope.breadcrumb = {type: 'brand'};
        console.log(id);
        if(id){
            $scope.breadcrumb.items = Brand.query();
        }
    }

    if('cat_id' in $stateParams){
        var id = parseInt($stateParams.cat_id);
        $scope.breadcrumb = {type: 'category'};
        $scope.breadcrumb.items = [];
        if(id){
            findCategoryPath(id);
        }

        function findCategoryPath(id){
            Category.findOne().$promise.then(function(child){
                $scope.breadcrumb.items.push(child);
                var p = child.parent;
                if(p != null){
                    findCategoryPath(1);
                }
            });
        }
    }

    // STORE

    /*var categories = $scope.categories = Category.query({filter:{order:'description'}});*/
    var brands = $scope.brands = Brand.query();

    var sortOptions = $scope.sortOptions = [
       {name:"Price Asc", val:'price ASC'},
       {name:"Price Desc", val:'price DESC'},
       {name:"Name Asc", val:"name"},
       {name:"Name Desc", val:"name DESC"}
    ];


    $scope.products = {};
    $scope.filtered = {};
    $scope.products.busy = false;
    $scope.products.end = false;
    $scope.products.after = 0;
    $scope.products.items = [];
    $scope.products.sort = sortOptions[0].val;

    function q(){
        var q= { limit: 5, offset: $scope.products.after, order: $scope.products.sort, where : {} };
        var q2 = {};
        if($scope.products.brand){
            q.where = {brand:$scope.products.brand};
            q2.where = {brand:$scope.products.brand};
        }
        if($stateParams.brand){
            q.where = {brand:parseInt($stateParams.brand)};
            q2.where = {brand:parseInt($stateParams.brand)};
        }
        if($stateParams.cat_id){
            q.where = {category:parseInt($stateParams.cat_id)};
            q2.where = {category:parseInt($stateParams.cat_id)};
        }

        Product.query({filter:q2},
            function(data){
                $scope.products.count = data.length;
        });
        // console.log('filter',q);
        return q;
    }
    $scope.search = function(param) {
        if('brand' in param){ /* && $state.current.url!='/brand/:brand/:description'*/
            $location.replace().path('brand/'+param.brand+'/');
            // $scope.products.brand = param.brand;
        }
        // console.log($scope.products.brand);
        // var sort = $scope.products.sort = ('sort' in param) ? param.sort : undefined;

        $scope.products.busy = false;
        $scope.products.end = false;
        $scope.products.after = 0;
        $scope.products.items = [];

        if ($scope.products.busy) return;
        $scope.products.busy = true;


        // var products = $scope.products =
        // Product.query(function(category) {
        //   socket.syncUpdates('category', $scope.category);
        // });



        $scope.products.items = Product.query({filter:q()}, function(data){
            $scope.products.busy = false;
            $scope.filtered.count = data.length;
            if(data.length==5) { $scope.products.after = $scope.products.after + data.length; } else { $scope.products.end = true;}
        }, function(){ $scope.products.busy = false; });
        // console.log($scope.products.items)
    }

    $scope.scroll = function() {
        if ($scope.products.busy || $scope.products.end) return;
        $scope.products.busy = true;

        Product.query({filter:q()}, function(data){
            for (var i = 0; i < data.length; i++) {
                $scope.products.items.push(data[i]);
            }$scope.filtered.count = data.length + $scope.products.after;
            if(data.length==5) { $scope.products.after = $scope.products.after + data.length; } else { $scope.products.end = true;}
            $scope.products.busy = false;
        }, function(){ $scope.products.busy = false; });
    }



    // $scope.fl = { brands: [] };

    $scope.lower_price_bound = 0;
    $scope.upper_price_bound = 1500;
    $scope.priceRange = function(item) {
        return (parseInt(item['price']) >= $scope.lower_price_bound && parseInt(item['price']) <= $scope.upper_price_bound);
    };

    $scope.loadMore = function() {
        $scope.l += 12;
    };
  });
