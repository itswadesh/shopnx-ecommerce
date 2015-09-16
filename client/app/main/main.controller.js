'use strict';

angular.module('shopnxApp')
  .controller('ProductDetailsCtrl', function ($scope, $rootScope, Product, socket, $stateParams, $location, $state, $injector) {
    var id = $stateParams.id;
    // var slug = $stateParams.slug;
    // Storing the product id into localStorage because the _id of the selected product which was passed as a hidden parameter from products won't available on page refresh
    if (localStorage != null && JSON != null && id != null) {
        localStorage.productId = id;
    }
    var productId = localStorage != null ? localStorage.productId : null;

    $scope.product = Product.get({id:productId},function(data) {
      socket.syncUpdates('product', $scope.data);
      generateBreadCrumb('Category',data.category._id);
    });

    // To shuffle throught different product variants
    $scope.i=0;
    $scope.changeIndex =function(i){
        $scope.i=i;
    };

    // The main function to navigate to a page with some hidden parameters
    $scope.navigate = function(page,params){
      if(params){
        $location.replace().path(page+'/'+params.slug+'/'+params._id);
      }else{
        $location.replace().path('/');
      }
    };

    // Function to generate breadcrumb for category and brand
    // Future: Put it inside a directive
    var generateBreadCrumb = function(page, id){
      $scope.breadcrumb = {};
      $scope.breadcrumb.items = [];
      var api = $injector.get(page);
      api.get({id:id}).$promise.then(function(child){
        $scope.breadcrumb.items.push(child);
        // var p = child.parent;
        // if(p != null){findBrandPath(1);}
        if(page==='Category'){
          $scope.breadcrumb.items.push({name:'All Categories'});
        }
        else if(page==='Brand'){
          $scope.breadcrumb.items.push({name:'All Brands'});
        }
      });
    };

  })

  .controller('MainCtrl', function ($scope, $state, $stateParams, $location, Product, Brand, Category, socket, $rootScope, $injector, $loading) {

    if ($stateParams.productSku != null) {
        $scope.product = $scope.store.getProduct($stateParams.productSku);
    }

    $scope.priceSlider = {
        min: 0,
        max: 2500,
        ceil: 2500,
        floor: 0
    };

// For Price slider
    $scope.currencyFormatting = function(value){
      return  '$ ' + value.toString();
    };

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
      if(page==='sort'){
        delete params.$$hashKey;
        var paramString = JSON.stringify(params);
        // console.log(paramString);
        $state.go($state.current, {sort: paramString}, {reload: true});
      }
      else if(params){
        $location.replace().path(page+'/'+params.slug+'/'+params._id);
      }else{
        $location.replace().path('/');
      }
    };
    var generateBreadCrumb = function(page, id){
      $scope.breadcrumb.items = [];
      var api = $injector.get(page);
      api.get({id:id}).$promise.then(function(child){
        $scope.breadcrumb.items.push(child);
        // var p = child.parent;
        // if(p != null){findBrandPath(1);}
        if(page==='Category'){
          $scope.breadcrumb.items.push({name:'All Categories'});
        }else if(page==='Brand'){
          $scope.breadcrumb.items.push({name:'All Brands'});
        }
      });
    };


    var sort = $scope.products.sort = $stateParams.sort;
    var q = {where:{},limit:10};

    if('page' in $stateParams){
      var brandId, categoryId;
      if($stateParams.page && $stateParams._id){
        $scope.products.brand = {_id : $stateParams._id};
        $scope.breadcrumb = {type: $stateParams.page};
        generateBreadCrumb($stateParams.page,$stateParams._id);
        if($stateParams.page==='Category'){ categoryId = $stateParams._id;}
        if($stateParams.page==='Brand'){ brandId = $stateParams._id;}
        q.where['brand._id'] = brandId;
        q.where['category._id'] = categoryId;
      }else{
        q = {sort:sort,limit:10};
      }
    }
    // displayProducts(q);
    $scope.filterBrands = function() {
      // This function required to query from database in place of filtering items from angular $scope,
      // In some cases we load only 20 products for pagination in that case we won't be able to filter properly

      if ($scope.products.busy){ return; }
      $scope.products.busy = true;
      if($scope.fl.brands){
        if($scope.fl.brands.length>0){
          var brandIds = [];
          // var brandNames = [];
          angular.forEach($scope.fl.brands,function(brand){
            brandIds.push(brand._id);
            // brandNames.push(brand.name);
          });
          // $scope.filteredBrands = brandNames;
          q.where['brand._id'] = { $in: brandIds };
        }else{
          q.where.brand = undefined;
          q.where['brand._id'] = undefined;
        }
      }else {
        q.where.brand = undefined;
        q.where['brand._id'] = undefined;
      }
      displayProducts(q,true);
    };

    $scope.filterPrice = function(price) {
      // This function required to query from database in place of filtering items from angular $scope,
      // In some cases we load only 20 products for pagination in that case we won't be able to filter properly
      $scope.products.busy = false;
      $scope.products.end = false;
      $scope.products.after = 0;
      $scope.products.items = [];

      if ($scope.products.busy){ return;}
      $scope.products.busy = true;
      q.where['variants.price'] = { $gt: price.min, $lt:price.max };
      displayProducts(q,true);
    };

    $scope.sortNow = function(sort){
        q.sort = sort;
        displayProducts(q,true);
    };

    var displayProducts = function(q,flush){
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
    };

    displayProducts(q);
    $scope.scroll = function() {
        if ($scope.products.busy || $scope.products.end){ return;}
        $scope.products.busy = false;
        q.skip = $scope.products.after;
        displayProducts(q);
    };


});
