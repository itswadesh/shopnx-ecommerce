'use strict';

angular.module('shopnxApp')
    // .service('ngCart', ['$rootScope', 'ngCartItem', 'store', function ($rootScope, ngCartItem, store) {
    //
    //     this.init = function(){
    //         this.$cart = {
    //             shipping : null,
    //             taxRate : null,
    //             tax : null,
    //             items : []
    //         };
    //     };
    //
    //     this.addItem = function (id, name, price, quantity, data) {
    //
    //         var inCart = this.getItemById(id);
    //
    //         if (typeof inCart === 'object'){
    //             //Update quantity of an item if it's already in the cart
    //             inCart.setQuantity(quantity, false);
    //         } else {
    //             var newItem = new ngCartItem(id, name, price, quantity, data);
    //             this.$cart.items.push(newItem);
    //             $rootScope.$broadcast('ngCart:itemAdded', newItem);
    //         }
    //
    //         $rootScope.$broadcast('ngCart:change', {});
    //     };
    //
    //     this.getItemById = function (itemId) {
    //         var items = this.getCart().items;
    //         var build = false;
    //
    //         angular.forEach(items, function (item) {
    //             if  (item.getId() === itemId) {
    //                 build = item;
    //             }
    //         });
    //         return build;
    //     };
    //
    //     this.setShipping = function(shipping){
    //         this.$cart.shipping = shipping;
    //         return this.getShipping();
    //     };
    //
    //     this.getShipping = function(){
    //         if (this.getCart().items.length == 0) return 0;
    //         return  this.getCart().shipping;
    //     };
    //
    //     this.setTaxRate = function(taxRate){
    //         this.$cart.taxRate = +parseFloat(taxRate).toFixed(2);
    //         return this.getTaxRate();
    //     };
    //
    //     this.getTaxRate = function(){
    //         return this.$cart.taxRate
    //     };
    //
    //     this.getTax = function(){
    //         return +parseFloat(((this.getSubTotal()/100) * this.getCart().taxRate )).toFixed(2);
    //     };
    //
    //     this.setCart = function (cart) {
    //         this.$cart = cart;
    //         return this.getCart();
    //     };
    //
    //     this.getCart = function(){
    //         return this.$cart;
    //     };
    //
    //     this.getItems = function(){
    //         return this.getCart().items;
    //     };
    //
    //     this.getTotalItems = function () {
    //         var count = 0;
    //         var items = this.getItems();
    //         angular.forEach(items, function (item) {
    //             count += item.getQuantity();
    //         });
    //         return count;
    //     };
    //
    //     this.getTotalUniqueItems = function () {
    //         return this.getCart().items.length;
    //     };
    //
    //     this.getSubTotal = function(){
    //         var total = 0;
    //         angular.forEach(this.getCart().items, function (item) {
    //             total += item.getTotal();
    //         });
    //         return +parseFloat(total).toFixed(2);
    //     };
    //
    //     this.totalCost = function () {
    //         return +parseFloat(this.getSubTotal() + this.getShipping() + this.getTax()).toFixed(2);
    //     };
    //
    //     this.removeItem = function (index) {
    //         this.$cart.items.splice(index, 1);
    //         $rootScope.$broadcast('ngCart:itemRemoved', {});
    //         $rootScope.$broadcast('ngCart:change', {});
    //
    //     };
    //
    //     this.removeItemById = function (id) {
    //         var cart = this.getCart();
    //         angular.forEach(cart.items, function (item, index) {
    //             if  (item.getId() === id) {
    //                 cart.items.splice(index, 1);
    //             }
    //         });
    //         this.setCart(cart);
    //         $rootScope.$broadcast('ngCart:itemRemoved', {});
    //         $rootScope.$broadcast('ngCart:change', {});
    //     };
    //
    //     this.empty = function () {
    //
    //         $rootScope.$broadcast('ngCart:change', {});
    //         this.$cart.items = [];
    //         localStorage.removeItem('cart');
    //     };
    //
    //     this.isEmpty = function () {
    //
    //         return (this.$cart.items.length > 0 ? false : true);
    //
    //     };
    //
    //     this.toObject = function() {
    //
    //         if (this.getItems().length === 0) return false;
    //
    //         var items = [];
    //         angular.forEach(this.getItems(), function(item){
    //             items.push (item.toObject());
    //         });
    //
    //         return {
    //             shipping: this.getShipping(),
    //             tax: this.getTax(),
    //             taxRate: this.getTaxRate(),
    //             subTotal: this.getSubTotal(),
    //             totalCost: this.totalCost(),
    //             items:items
    //         }
    //     };
    //
    //
    //     this.$restore = function(storedCart){
    //         var _self = this;
    //         _self.init();
    //         _self.$cart.shipping = storedCart.shipping;
    //         _self.$cart.tax = storedCart.tax;
    //
    //         angular.forEach(storedCart.items, function (item) {
    //             _self.$cart.items.push(new ngCartItem(item._id,  item._name, item._price, item._quantity, item._data));
    //         });
    //         this.$save();
    //     };
    //
    //     this.$save = function () {
    //         return store.set('cart', JSON.stringify(this.getCart()));
    //     }
    //
    // }])
    //
    // .factory('ngCartItem', ['$rootScope', '$log', function ($rootScope, $log) {
    //
    //     var item = function (id, name, price, quantity, data) {
    //         this.setId(id);
    //         this.setName(name);
    //         this.setPrice(price);
    //         this.setQuantity(quantity);
    //         this.setData(data);
    //     };
    //
    //
    //     item.prototype.setId = function(id){
    //         if (id)  this._id = id;
    //         else {
    //             $log.error('An ID must be provided');
    //         }
    //     };
    //
    //     item.prototype.getId = function(){
    //         return this._id;
    //     };
    //
    //
    //     item.prototype.setName = function(name){
    //         if (name)  this._name = name;
    //         else {
    //             $log.error('A name must be provided');
    //         }
    //     };
    //     item.prototype.getName = function(){
    //         return this._name;
    //     };
    //
    //     item.prototype.setPrice = function(price){
    //         var priceFloat = parseFloat(price);
    //         if (priceFloat) {
    //             if (priceFloat <= 0) {
    //                 $log.error('A price must be over 0');
    //             } else {
    //                 this._price = (priceFloat);
    //             }
    //         } else {
    //             $log.error('A price must be provided');
    //         }
    //     };
    //     item.prototype.getPrice = function(){
    //         return this._price;
    //     };
    //
    //
    //     item.prototype.setQuantity = function(quantity, relative){
    //
    //
    //         var quantityInt = parseInt(quantity);
    //         if (quantityInt % 1 === 0){
    //             if (relative === true){
    //                 this._quantity  += quantityInt;
    //             } else {
    //                 this._quantity = quantityInt;
    //             }
    //             if (this._quantity < 1) this._quantity = 1;
    //
    //         } else {
    //             this._quantity = 1;
    //             $log.info('Quantity must be an integer and was defaulted to 1');
    //         }
    //         $rootScope.$broadcast('ngCart:change', {});
    //
    //     };
    //
    //     item.prototype.getQuantity = function(){
    //         return this._quantity;
    //     };
    //
    //     item.prototype.setData = function(data){
    //         if (data) this._data = data;
    //     };
    //
    //     item.prototype.getData = function(){
    //         if (this._data) return this._data;
    //         else $log.info('This item has no data');
    //     };
    //
    //
    //     item.prototype.getTotal = function(){
    //         return +parseFloat(this.getQuantity() * this.getPrice()).toFixed(2);
    //     };
    //
    //     item.prototype.toObject = function() {
    //         return {
    //             id: this.getId(),
    //             name: this.getName(),
    //             price: this.getPrice(),
    //             quantity: this.getQuantity(),
    //             data: this.getData(),
    //             total: this.getTotal()
    //         }
    //     };
    //
    //     return item;
    //
    // }])
  .factory('Cart', function () {
    // console.log('factory');
    var myCart = new shoppingCart("ShopNx");
    myCart.addCheckoutParameters("PayPal", "abc@gmail.com");
    return { cart: myCart }
  });

  //----------------------------------------------------------------
  // shopping cart
  //
  function shoppingCart(cartName) {
      this.cartName = cartName;
      this.clearCart = false;
      this.checkoutParameters = {};
      this.items = [];
      this.skuArray.push(item.sku);
      // load items from local storage when initializing
      this.loadItems();

      // save items to local storage when unloading
      var self = this;
      $(window).unload(function () {
          if (self.clearCart) {
              self.clearItems();
          }
          self.saveItems();
          self.clearCart = false;
      });
  }

  // load items from local storage
  shoppingCart.prototype.loadItems = function () {
      var items = localStorage != null ? localStorage[this.cartName + "_items"] : null;
      if (items != null && JSON != null) {
          try {
              var items = JSON.parse(items);
              for (var i = 0; i < items.length; i++) {
                  var item = items[i];
                  if (item.sku != null && item.name != null && item.price != null && item.quantity != null) {
                      item = new cartItem(item.sku, item.name, item.price, item.quantity);
                      this.items.push(item);
                  }
              }
          }
          catch (err) {
              // ignore errors while loading...
          }
      }
  }

  // save items to local storage
  shoppingCart.prototype.saveItems = function () {
      if (localStorage != null && JSON != null) {
          localStorage[this.cartName + "_items"] = JSON.stringify(this.items);
      }
  }

  // adds an item to the cart
  shoppingCart.prototype.addItem = function (sku, name, price, quantity) {
    console.log(this);
      quantity = this.toNumber(quantity);
      if (quantity != 0) {

          // update quantity for existing item
          var found = false;
          for (var i = 0; i < this.items.length && !found; i++) {
              var item = this.items[i];
              if (item.sku == sku) {
                  found = true;
                  item.quantity = this.toNumber(item.quantity + quantity);
                  if (item.quantity <= 0) {
                      this.items.splice(i, 1);
                  }
              }
          }

          // new item, add now
          if (!found) {
              var item = new cartItem(sku, name, price, quantity);
              this.items.push(item);
          }

          // save changes
          this.saveItems();
      }
  }

  // get the total price for all items currently in the cart
  shoppingCart.prototype.getTotalPrice = function (sku) {
      var total = 0;
      for (var i = 0; i < this.items.length; i++) {
          var item = this.items[i];
          if (sku == null || item.sku == sku) {
              total += this.toNumber(item.quantity * item.price);
          }
      }
      return total;
  }

  // get the total price for all items currently in the cart
  shoppingCart.prototype.getTotalCount = function (sku) {
      var count = 0;
      for (var i = 0; i < this.items.length; i++) {
          var item = this.items[i];
          if (sku == null || item.sku == sku) {
              count += this.toNumber(item.quantity);
          }
      }
      return count;
  }

  // clear the cart
  shoppingCart.prototype.clearItems = function () {
      this.items = [];
      this.saveItems();
  }

  // define checkout parameters
  shoppingCart.prototype.addCheckoutParameters = function (serviceName, merchantID, options) {

      // check parameters
      if (serviceName != "PayPal") {
          throw "Name of the service must be 'PayPal'.";
      }
      if (merchantID == null) {
          throw " Need merchantID in order to checkout.";
      }

      // save parameters
      this.checkoutParameters[serviceName] = new checkoutParameters(serviceName, merchantID, options);
  }

  // check out
  shoppingCart.prototype.checkout = function (serviceName, clearCart) {

      // select serviceName if we have to
      if (serviceName == null) {
          var p = this.checkoutParameters[Object.keys(this.checkoutParameters)[0]];
          serviceName = p.serviceName;
      }

      // sanity
      if (serviceName == null) {
          throw "Use the 'addCheckoutParameters' method to define at least one checkout service.";
      }

      // go to work
      var parms = this.checkoutParameters[serviceName];
      if (parms == null) {
          throw "Cannot get checkout parameters for '" + serviceName + "'.";
      }
      switch (parms.serviceName) {
          case "PayPal":
              this.checkoutPayPal(parms, clearCart);
              break;
          default:
              throw "Unknown checkout service: " + parms.serviceName;
      }
  }

  // check out using PayPal
  // for details see:
  // www.paypal.com/cgi-bin/webscr?cmd=p/pdn/howto_checkout-outside
  shoppingCart.prototype.checkoutPayPal = function (parms, clearCart) {

      // global data
      var data = {
          cmd: "_cart",
          business: parms.merchantID,
          upload: "1",
          rm: "2",
          charset: "utf-8"
      };

      // item data
      for (var i = 0; i < this.items.length; i++) {
          var item = this.items[i];
          var ctr = i + 1;
          data["item_number_" + ctr] = item.sku;
          data["item_name_" + ctr] = item.name;
          data["quantity_" + ctr] = item.quantity;
          data["amount_" + ctr] = item.price.toFixed(2);
      }

      // build form
      var form = $('<form/></form>');
      form.attr("action", "https://www.paypal.com/cgi-bin/webscr");
      form.attr("method", "POST");
      form.attr("style", "display:none;");
      this.addFormFields(form, data);
      this.addFormFields(form, parms.options);
      $("body").append(form);

      // submit form
      this.clearCart = clearCart == null || clearCart;
      form.submit();
      form.remove();
  }

  // check out using Google Wallet
  // for details see:
  // developers.google.com/checkout/developer/Google_Checkout_Custom_Cart_How_To_HTML
  // developers.google.com/checkout/developer/interactive_demo
  /*shoppingCart.prototype.checkoutGoogle = function (parms, clearCart) {

      // global data
      var data = {};

      // item data
      for (var i = 0; i < this.items.length; i++) {
          var item = this.items[i];
          var ctr = i + 1;
          data["item_name_" + ctr] = item.sku;
          data["item_description_" + ctr] = item.name;
          data["item_price_" + ctr] = item.price.toFixed(2);
          data["item_quantity_" + ctr] = item.quantity;
          data["item_merchant_id_" + ctr] = parms.merchantID;
      }

      // build form
      var form = $('<form/></form>');
      // NOTE: in production projects, use the checkout.google url below;
      // for debugging/testing, use the sandbox.google url instead.
      //form.attr("action", "https://checkout.google.com/api/checkout/v2/merchantCheckoutForm/Merchant/" + parms.merchantID);
      form.attr("action", "https://sandbox.google.com/checkout/api/checkout/v2/checkoutForm/Merchant/" + parms.merchantID);
      form.attr("method", "POST");
      form.attr("style", "display:none;");
      this.addFormFields(form, data);
      this.addFormFields(form, parms.options);
      $("body").append(form);

      // submit form
      this.clearCart = clearCart == null || clearCart;
      form.submit();
      form.remove();
  }
  */
  // utility methods
  shoppingCart.prototype.addFormFields = function (form, data) {
      if (data != null) {
          $.each(data, function (name, value) {
              if (value != null) {
                  var input = $("<input></input>").attr("type", "hidden").attr("name", name).val(value);
                  form.append(input);
              }
          });
      }
  }
  shoppingCart.prototype.toNumber = function (value) {
      value = value * 1;
      return isNaN(value) ? 0 : value;
  }

  //----------------------------------------------------------------
  // checkout parameters (one per supported payment service)
  //
  function checkoutParameters(serviceName, merchantID, options) {
      this.serviceName = serviceName;
      this.merchantID = merchantID;
      this.options = options;
  }

  //----------------------------------------------------------------

  function cartItem(sku, name, price, quantity) {
      this.sku = sku;
      this.name = name;
      this.price = price * 1;
      this.quantity = quantity * 1;
  }

  function product(sku, name, description, price, cal, carot, vitc, folate, potassium, fiber) {
      this.sku = sku; // product code (SKU = stock keeping unit)
      this.name = name;
      this.description = description;
      this.price = price;
      this.cal = cal;
      this.nutrients = {
          "Carotenoid": carot,
          "Vitamin C": vitc,
          "Folates": folate,
          "Potassium": potassium,
          "Fiber": fiber
      };
  }

//
//   function shoppingCart(cartName) {
//       this.cartName = cartName;
//       this.clearCart = false;
//       this.checkoutParameters = {};
//       this.items = [];
//       this.skuArray = [];
//       this.loadItems();
//       var self = this;
//       // $(window).unload(function () {
//       //     if (self.clearCart) {
//       //         self.clearItems();
//       //     }
//       //     self.saveItems();
//       //     self.clearCart = false;
//       // });
//   }
//
//
//   // load items from local storage
//   shoppingCart.prototype.loadItems = function () {
//     // console.log('loadItems');
//       var items = localStorage != null ? localStorage[this.cartName + "_items"] : null;
//       if (items != null && JSON != null) {
//           try {
//               var items = JSON.parse(items);
//               for (var i = 0; i < items.length; i++) {
//                   var item = items[i];
//                   if (item.sku != null && item.name != null && item.price != null && item.quantity != null) {
//                       item = new cartItem(item.sku, item.name, item.mrp, item.price, item.quantity, item.image, item.category, item.packing, item.status);
//                       this.items.push(item);
//                       this.skuArray.push(item.sku);
//                   }
//               }
//           }
//           catch (err) {
//               // ignore errors while loading...
//           }
//       }
//   }
//
//   shoppingCart.prototype.getTotalPrice = function (sku) {
//       var total = 0;
//       for (var i = 0; i < this.items.length; i++) {
//           var item = this.items[i];
//           if (sku == null || item.sku == sku) {
//               total += this.toNumber(item.quantity * item.price);
//           }
//       }
//       return total;
//   }
//
//   // get the total price for all items currently in the cart
//   shoppingCart.prototype.getTotalCount = function (sku) {
//       var count = 0;
//       for (var i = 0; i < this.items.length; i++) {
//           var item = this.items[i];
//           if (sku == null || item.sku == sku) {
//               count += this.toNumber(item.quantity);
//           }
//       }
//       return count;
//   }
//
//   // clear the cart
//   shoppingCart.prototype.clearItems = function () {
//       this.items = [];
//       this.skuArray = [];
//       this.saveItems();
//   }
//
//   // save items to local storage
//   shoppingCart.prototype.saveItems = function () {
//       if (localStorage != null && JSON != null) {
//           localStorage[this.cartName + "_items"] = JSON.stringify(this.items);
//       }
//   }
//
//
//
//   // adds an item to the cart
//   shoppingCart.prototype.addItem = function (sku, name, mrp, price, quantity, image, category, packing, cart) {
//               console.log(this.skuArray, this.items);
//     // console.log('xxx',this,cart);
//
//       quantity = this.toNumber(quantity);
//       if (quantity != 0) {
//           // update quantity for existing item
//           var found = false;
//           for (var i = 0; i < this.items.length && !found; i++) {
//               var item = this.items[i];
//               if (item.sku == sku) {
//                   found = true;
//                   item.quantity = this.toNumber(this.toNumber(item.quantity) + quantity);
//                   if (item.quantity <= 0) {
//                       this.items.splice(i, 1);
//                       this.skuArray.splice(i,1);
//                   }
//               }
//           }
//
//           // new item, add now
//           if (!found) {
//               var item = new cartItem(sku, name, mrp, price, quantity, image, category, packing, 0);
//               console.log(this.items, this.skuArray);
//               this.items.push(item);
//               this.skuArray.push(item.sku);
//           }
//
//           // save changes
//           this.saveItems();
//       }
//   }
//
//
//   shoppingCart.prototype.getTotalPriceAfterShipping = function (sku) { //Total Price Including Shipping
//       var total = 0;
//       total = this.getTotalPrice() ;
//       if(total<500)
//       total+=20;
//       return total;
//   }
//
//
//   shoppingCart.prototype.toNumber = function (value) {
//       value = value * 1;
//       return isNaN(value) ? 0 : value;
//   }
//
//   //----------------------------------------------------------------
//   // items in the cart
//   //
//   function cartItem(sku, name, mrp, price, quantity, image, category, packing) {
//       this.sku = sku;
//       this.name = name;
//       this.image = image;
//       this.category = category;
//       this.packing = packing;
//       this.mrp = mrp;
//       this.price = price * 1;
//       this.quantity = quantity * 1;
//       this.status = 0;
//   }
//
//   function store() {
//     this.rings = [
//         new product("rings1", "Halo", "Classic-C905R7", 25),
//         new product("rings2", "Gemstone", "Classic-C904P5", 30),
//         new product("rings3", "Pave", "Classic-939R7", 18),
//         new product("rings4", "Cathedral", "Classic-938R7", 32),
//         new product("rings5", "Vintage", "OClassic-918CU7", 24),
//         new product("rings6", "Channel-Set", "Classic-924R7", 11),
//         new product("rings7", "Swirl", "Classic-917R7", 16),
//         new product("rings8", "Bezel", "Classic-916R7", 20),
//         new product("rings9", "Prong", "Classic-916R6", 10),
//         new product("rings10", "Emerald", "Classic-912RD7", 26),
//         new product("rings11", "Pear", "Classic-911RD7", 8),
//         new product("rings13", "Cushion", "Classic-916RD6", 5),
//         new product("rings14", "Princess", "Classic-910R7", 19)
//     ];
//
// }
//
//
//
//
// shoppingCart.prototype.addCheckoutParameters = function (serviceName, merchantID, options) {
//
//     if (serviceName != "PayPal") {
//         throw "Name of the service must be 'PayPal'.";
//     }
//     if (merchantID == null) {
//         throw " Need merchantID in order to checkout.";
//     }
//
//     this.checkoutParameters[serviceName] = new checkoutParameters(serviceName, merchantID, options);
// }
// shoppingCart.prototype.checkout = function (serviceName, clearCart) {
//     if (serviceName == null) {
//         var p = this.checkoutParameters[Object.keys(this.checkoutParameters)[0]];
//         serviceName = p.serviceName;
//     }
//     if (serviceName == null) {
//         throw "Use the 'addCheckoutParameters' method to define at least one checkout service.";
//     }
//     var parms = this.checkoutParameters[serviceName];
//     if (parms == null) {
//         throw "Cannot get checkout parameters for '" + serviceName + "'.";
//     }
//     switch (parms.serviceName) {
//         case "PayPal":
//             this.checkoutPayPal(parms, clearCart);
//             break;
//         default:
//             throw "Unknown checkout service: " + parms.serviceName;
//     }
// }
//
// shoppingCart.prototype.checkoutPayPal = function (parms, clearCart) {
//         var data = {
//         cmd: "_cart",
//         business: parms.merchantID,
//         upload: "1",
//         rm: "2",
//         charset: "utf-8"
//     };
//     for (var i = 0; i < this.items.length; i++) {
//         var item = this.items[i];
//         var ctr = i + 1;
//         data["item_number_" + ctr] = item.sku;
//         data["item_name_" + ctr] = item.name;
//         data["quantity_" + ctr] = item.quantity;
//         data["amount_" + ctr] = item.price.toFixed(2);
//     }
//     var form = $('<form/></form>');
//     form.attr("action", "https://www.paypal.com/cgi-bin/webscr");
//     form.attr("method", "POST");
//     form.attr("style", "display:none;");
//     this.addFormFields(form, data);
//     this.addFormFields(form, parms.options);
//     $("body").append(form);
//
//     // submit the form to PayPal servers
//     this.clearCart = clearCart == null || clearCart;
//     form.submit();
//     form.remove();
// }
//
// shoppingCart.prototype.addFormFields = function (form, data) {
//     if (data != null) {
//         $.each(data, function (name, value) {
//             if (value != null) {
//                 var input = $("<input></input>").attr("type", "hidden").attr("name", name).val(value);
//                 form.append(input);
//             }
//         });
//     }
// }
//
//
// function checkoutParameters(serviceName, merchantID, options) {
//     this.serviceName = serviceName;
//     this.merchantID = merchantID;
//     this.options = options;
// }
// function cartItem(sku, name, price, quantity) {
//     this.sku = sku;
//     this.name = name;
//     this.price = price * 1;
//     this.quantity = quantity * 1;
// }
//
//
//
// store.prototype.getProduct = function (sku) {
//     for (var i = 0; i < this.rings.length; i++) {
//         if (this.rings[i].sku == sku)
//             return this.rings[i];
//     }
//     return null;
// }
