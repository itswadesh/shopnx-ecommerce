'use strict';

angular.module('shopnxApp')

  .factory('factory', function () {

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  })
  .factory('Product', function($resource) {
    return $resource('/api/products/:id', null, {'update': { method:'PUT' } });
  })
  // .factory('Category', function($resource) {
    // return $resource('/api/category/:id', null, {'update': { method:'PUT' } });
  // });

  .factory('Category', function($resource) {
    return $resource(
        '/api/category/parent/:p:c:id', {
            p: '@p',
            c: '@c'
        }, {
            update: {
                method: 'PUT'
            },
            parent: {
                method: 'GET',
                params: {p},
                isArray: true
            }
        }
    );

    // 'where': {
    //         method: "GET",
    //         params: '@id'
    //       }
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
