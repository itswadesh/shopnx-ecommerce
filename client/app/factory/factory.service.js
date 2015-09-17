'use strict';

angular.module('shopnxApp')
// Sample factory (dummy)
  .factory('factory', [function () {
    var somValue = 42;
    return {
      someMethod: function () {
        return somValue;
      }
    };
  }])
  .factory('Product', ['$resource', function($resource) {
    var obj = {};
    obj = $resource('/api/products/:id', null, {'update': { method:'PUT' } });
    return obj;
  }])

  .factory('SortOptions', [function() {
    var obj = {};
    obj.server= [
       {name:'Price Asc', val:{'variants.price':1}},
       {name:'Price Desc', val:{'variants.price':-1}},
       {name:'Name Asc', val:{'name':1}},
       {name:'Name Desc', val:{'name':-1}}
    ];
    obj.client= [
       {name:'Price Asc', val:'variants[0].price'},
       {name:'Price Desc', val:'-variants[0].price'},
       {name:'Name Asc', val:'name'},
       {name:'Name Desc', val:'-name'}
    ];
    return obj;
  }])

  .factory('Category', ['$resource', function($resource) {
    var obj = {};
    obj = $resource('/api/category/:id', null, {'update': { method:'PUT' }});
    obj.parent = $resource('/api/category/parent/:id', null, {'update': { method:'PUT' }});
    obj.all = $resource('/api/category/all', null, {'update': { method:'PUT' }});
    return obj;
  }])
  .factory('Brand', ['$resource', function($resource) {
    return $resource('/api/brands/:id', null, {'update': { method:'PUT' } });
  }])
  .factory('Customer', ['$resource', function($resource) {
    return $resource('/api/customers/:id', null, {'update': { method:'PUT' } });
  }])
  .factory('Order', ['$resource', function($resource) {
    var obj = {};
    obj = $resource('/api/orders/:id', null, {'update': { method:'PUT' } });
    obj.my = $resource('/api/orders/my', null, {'update': { method:'PUT' }});
    obj.status = [
      {name:'Pending Payment', val:402},
      {name:'Order Placed', val:201},
      {name:'Order Accepted', val:202},
      {name:'Order Executed', val:302},
      {name:'Shipped', val:200},
      {name:'Delivered', val:200},
      {name:'Cancelled', val:204},
      {name:'Not in Stock', val:404}
    ];
    return obj;
  }]);
