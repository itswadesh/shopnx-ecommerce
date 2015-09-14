'use strict';

angular.module('shopnxApp')
  .controller('ProductDetailsCtrl', function ($scope, $rootScope, Product, socket, $stateParams, $location, $state, $injector) {
    var id = $stateParams.id;
    var slug = $stateParams.slug;
    // Storing the product id into localStorage because the _id of the selected product which was passed as a hidden parameter from products won't available on page refresh
    if (localStorage != null && JSON != null && id !=null) {
        localStorage["product_id"] = id;
    }
    var product_id = localStorage != null ? localStorage["product_id"] : null;
    // var sl =
    // console.log(id,slug,product_id);
    var product = $scope.product = Product.get({id:product_id},function(data) {
      socket.syncUpdates('product', $scope.data);
      generateBreadCrumb('Category',data.category._id);
    });

    $scope.i=0;
    $scope.changeIndex =function(i){
        $scope.i=i;
    }

    $scope.navigate = function(page,params){
      if(params){
        $location.replace().path(page+'/'+params.slug+'/'+params._id);
      }else{
        $location.replace().path('/');
      }
    }

    var generateBreadCrumb = function(page, id){
      $scope.breadcrumb = {};
      $scope.breadcrumb.items = [];
      var api = $injector.get(page);
      api.get({id:id}).$promise.then(function(child){
        $scope.breadcrumb.items.push(child);
        var p = child.parent;
        if(p != null) findBrandPath(1);
        if(page=='Category')
          $scope.breadcrumb.items.push({name:"All Categories"});
        else if(page=='Brand')
          $scope.breadcrumb.items.push({name:"All Brands"});
      });
    }

  })
  .controller('SubProductCtrl', function ($scope, $rootScope, Product, socket, $stateParams, SortOptions) {
    $scope.products = {};
    var page = $stateParams.page;
    var id = $stateParams._id;
    var slug = $stateParams.slug;
    // var sortOptions = $scope.sortOptions = SortOptions.product;
    /*var product = $scope.product = Product.query({where:{brand:id},sort:$scope.products.sort},function(data) {
       socket.syncUpdates('product', $scope.data);
    });*/

    // function q(){
    //     var q= { limit: 5, skip: $scope.products.after, sort: $scope.products.sort, where : {} };
    //     var q2 = {};
    //     if($scope.products.brand){
    //         q.where = {brand:$scope.products.brand};
    //         q2.where = {brand:$scope.products.brand};
    //     }
    //     if($stateParams.brand){
    //         q.where = {brand:parseInt($stateParams.brand)};
    //         q2.where = {brand:parseInt($stateParams.brand)};
    //     }
    //     if($stateParams.cat_id){
    //         q.where = {category:parseInt($stateParams.cat_id)};
    //         q2.where = {category:parseInt($stateParams.cat_id)};
    //     }
    //
    //     // Product.query(q2,
    //     //     function(data){
    //     //         $scope.products.count = data.length;
    //     // });
    //     // console.log('filter',q);
    //     return q;
    // }
  })
  .controller('MainCtrl', function ($scope, $state, $stateParams, $location, Product, Brand, Category, socket, $rootScope, $injector, $loading) {
    // console.log($stateParams);
    // For product details page

    if ($stateParams.productSku != null) {
        $scope.product = $scope.store.getProduct($stateParams.productSku);
    }

    // $scope.startLoading = function (name) {
    //   $loading.start(name);
    // };
    //
    // $scope.finishLoading = function (name) {
    //   $loading.finish(name);
    // };



    $scope.priceSlider = {
        min: 0,
        max: 2500,
        ceil: 2500,
        floor: 0
    };

    $scope.currencyFormatting = function(value) { return  "$ " + value.toString() }
    $scope.products = {};
    $scope.filtered = {};
    $scope.products.busy = false;
    $scope.products.end = false;
    $scope.products.after = 0;
    $scope.products.items = [];
    // $scope.products.sort = sortOptions[0].val;
    $scope.fl = {};

    $scope.navigate = function(page,params){
      // var params = params.delete('$$hashKey');
      if(page=='sort'){
        delete params.$$hashKey;
        var paramString = JSON.stringify(params);
        // var p = Object.keys(params);
        console.log(paramString);
        // $location.path($stateParams.page+'/'+$stateParams.slug+'/'+$stateParams._id).search({sort: paramString});
        $state.go($state.current, {sort: paramString}, {reload: true});
      }
      else if(params){
        $location.replace().path(page+'/'+params.slug+'/'+params._id);
      }else{
        $location.replace().path('/');
        // $state.go('main', {sort: paramString}, {reload: true});
      }
    }
    var generateBreadCrumb = function(page, id){
      $scope.breadcrumb.items = [];
      var api = $injector.get(page);
      api.get({id:id}).$promise.then(function(child){
        $scope.breadcrumb.items.push(child);
        var p = child.parent;
        if(p != null) findBrandPath(1);
        if(page=='Category')
          $scope.breadcrumb.items.push({name:"All Categories"});
        else if(page=='Brand')
          $scope.breadcrumb.items.push({name:"All Brands"});
      });
    }


    var sort = $scope.products.sort = $stateParams.sort;
    var q = {where:{},limit:10};

    if('page' in $stateParams){
      // console.log('params2');
      var brandId, categoryId, q;
      if($stateParams.page && $stateParams._id){
        $scope.products.brand = {_id : $stateParams._id};
        $scope.breadcrumb = {type: $stateParams.page};
        generateBreadCrumb($stateParams.page,$stateParams._id);
        if($stateParams.page=='Category') categoryId = $stateParams._id;
        if($stateParams.page=='Brand') brandId = $stateParams._id;
        q.where['brand._id'] = brandId;
        q.where['category._id'] = categoryId;
        // q.limit = 10;
        // return;
      }else{
        q = {sort:sort,limit:10};
        // return;
      }
    }
    // displayProducts(q);
    $scope.filterBrands = function(id) {
      // This function required to query from database in place of filtering items from angular $scope,
      // In some cases we load only 20 products for pagination in that case we won't be able to filter properly
      // $scope.fl.brands = [];
      // console.log($scope.fl.brands);

      if ($scope.products.busy) return;
      $scope.products.busy = true;
      if($scope.fl.brands){
        if($scope.fl.brands.length>0){
          q.where['brand._id'] = { $in: $scope.fl.brands };
        }else{
          q.where.brand = undefined;
          q.where['brand._id'] = undefined;
        }
      }else {
        q.where.brand = undefined;
        q.where['brand._id'] = undefined;
      }
      displayProducts(q,true);
    }

    $scope.filterPrice = function(price) {
      // This function required to query from database in place of filtering items from angular $scope,
      // In some cases we load only 20 products for pagination in that case we won't be able to filter properly
      // console.log(price);
      $scope.products.busy = false;
      $scope.products.end = false;
      $scope.products.after = 0;
      $scope.products.items = [];

      // q.where.variants = {};
      if ($scope.products.busy) return;
      $scope.products.busy = true;
      q.where['variants.price'] = { $gt: price.min, $lt:price.max };
      displayProducts(q,true);
    }

    $scope.sortNow = function(sort){
        q.sort = sort;
        displayProducts(q,true);
    }

    var displayProducts = function(q,flush){
      // console.log(q,flush);
      if(flush){
        q.skip = 0;
        $scope.products.items = [];
        $scope.products.busy = false;
        $scope.products.end = false;
        $scope.products.after = 0;
      }
      $loading.start('products');
      Product.query(q, function(data){
          for (var i = 0; i < data.length; i++) {
              $scope.products.items.push(data[i]);
          }
          $scope.filtered.count = data.length + $scope.products.after;
          if(data.length>=5) { $scope.products.after = $scope.products.after + data.length; } else { $scope.products.end = true;}
          $scope.products.busy = false;
          $loading.finish('products');
      }, function(){ $scope.products.busy = false; $loading.finish('products');});
    }

    displayProducts(q);
    $scope.scroll = function() {
        // console.log($scope.products.busy,$scope.products.end,$scope.products.after);
        if ($scope.products.busy || $scope.products.end) return;
        $scope.products.busy = false;
        q.skip = $scope.products.after;
        displayProducts(q);
    }


});
