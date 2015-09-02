'use strict';

angular.module('angularFullstackApp')
  .factory('factory', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  })
  .factory('Product', function($resource) {

    return $resource('/api/products/:id', null,
      {
          'update': { method:'PUT' }
      }
    );
    // return $resource('/api/products/:id', null, { 'update': { method:'PUT' } });

  // var Product= $resource('/api/products/:id', {
  //   update: {
  //     method: 'PUT'
  //   }
  // });
  //
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
  })

  .factory('Category', function($resource) {
    return $resource('/api/category/:id'); // Note the full endpoint address
  })
  .factory('Brand', function($resource) {
    return $resource('/api/brands/:id'); // Note the full endpoint address
  })
  .factory('Customer', function($resource) {
    return $resource('/api/customers/:id'); // Note the full endpoint address
  });
