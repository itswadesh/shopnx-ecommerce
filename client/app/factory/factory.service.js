'use strict';

angular.module('shopnxApp')
// Sample factory (dummy)
  .factory('factory', function () {
    var somValue = 42;
    return {
      someMethod: function () {
        return somValue;
      }
    };
  })
  .factory('Product', function($resource) {
    var obj = {};
    obj = $resource('/api/products/:id', null, {'update': { method:'PUT' } });
    // obj.q = $resource('/products/limit/:limit/offset:offset');
    return obj;
  })

  .factory('SortOptions', function() {
    var obj = {};
    obj.server= [
       {name:"Price Asc", val:{'variants.price':1}},
       {name:"Price Desc", val:{'variants.price':-1}},
       {name:"Name Asc", val:{'name':1}},
       {name:"Name Desc", val:{'name':-1}}
    ];
    obj.client= [
       {name:"Price Asc", val:'variants[0].price'},
       {name:"Price Desc", val:'-variants[0].price'},
       {name:"Name Asc", val:'name'},
       {name:"Name Desc", val:'-name'}
    ];
    return obj;
  })

  .factory('Category', function($resource) {
    var obj = {}
    obj = $resource('/api/category/:id', null, {'update': { method:'PUT' }});
    obj.parent = $resource('/api/category/parent/:id', null, {'update': { method:'PUT' }});
    obj.all = $resource('/api/category/all', null, {'update': { method:'PUT' }});
    return obj;
  })
  .factory('Brand', function($resource) {
    return $resource('/api/brands/:id', null, {'update': { method:'PUT' } });
  })
  .factory('Customer', function($resource) {
    return $resource('/api/customers/:id', null, {'update': { method:'PUT' } });
  })
  .factory('Order', function($resource) {
    return $resource('/api/orders/:id', null, {'update': { method:'PUT' } });
  });

  // Product.prototype.update = function(cb) {
  //   return Product.update({
  //     id: this.id
  //   }, angular.extend({}, this, {
  //     _id: undefined
  //   }), cb);
  // }


    // var Product = $resource('/api/products/:id', {id: '@id'}, {
    //   'put': {method: 'PUT', params: {id: 'id'}, isArray: false}
    // });
    //
    // Product.prototype.$save = function() {
    //   console.log(this);
    //     if (this._id) {
    //         return this.$update();
    //     } else {
    //         return this.$create();
    //     }
    // };
    //
    //
    // Todo.get({id: 123}, function(todo) {
    //    todo.foo += '!';
    //    todo.$save();
    // });
    //  return Product;
