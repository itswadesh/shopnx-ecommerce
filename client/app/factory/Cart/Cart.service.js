'use strict';

  function ShoppingCart(cartName) {
      this.cartName = cartName;
      this.clearCart = false;
      this.checkoutParameters = {};
      this.items = [];
      this.skuArray = [];
      // load items from local storage when initializing
      this.loadItems();
  }

    //----------------------------------------------------------------
    // items in the cart
    //
    function CartItem(sku, name, slug, mrp, price, quantity, image, category, packing) {
        this.sku = sku;
        this.name = name;
        this.slug = slug;
        this.image = image;
        this.category = category;
        this.packing = packing;
        this.mrp = mrp;
        this.price = price * 1;
        this.quantity = quantity * 1;
        this.status = 0;
    }

    //----------------------------------------------------------------
    // checkout parameters (one per supported payment service)
    // replaced this.serviceName with serviceName because of jshint complaint
    //
    function checkoutParameters(serviceName, merchantID, options) {
        serviceName = serviceName;
        merchantID = merchantID;
        options = options;
    }

  // load items from local storage
  ShoppingCart.prototype.loadItems = function () {
      var items = localStorage !== null ? localStorage[this.cartName + '_items'] : null;
      if (items !== null && JSON !== null) {
          try {
              items = JSON.parse(items);
              for (var i = 0; i < items.length; i++) {
                  var item = items[i];
                  if (item.sku !== null && item.name !== null && item.price !== null) {
                      item = new CartItem(item.sku, item.name, item.slug, item.mrp, item.price, item.quantity, item.image, item.category, item.packing, item.status);
                      this.items.push(item);
                      this.skuArray.push(item.sku);
                  }
              }

          }
          catch (err) {
              // ignore errors while loading...
          }
      }
  };

  // save items to local storage
  ShoppingCart.prototype.saveItems = function () {
      if (localStorage !== null && JSON !== null) {
          localStorage[this.cartName + '_items'] = JSON.stringify(this.items);
      }
  };

  // adds an item to the cart
  ShoppingCart.prototype.addItem = function (sku, name, slug, mrp, price, quantity, image, category, packing) {
      quantity = this.toNumber(quantity);
      if (quantity !== 0) {
          // update quantity for existing item
          var found = false;
          for (var i = 0; i < this.items.length && !found; i++) {
              var item = this.items[i];
              if (item.sku === sku) {
                  found = true;
                  item.quantity = this.toNumber(this.toNumber(item.quantity) + quantity);
                  if (item.quantity <= 0) {
                      this.items.splice(i, 1);
                      this.skuArray.splice(i,1);
                  }
              }
          }

          // new item, add now
          if (!found) {
              var itm = new CartItem(sku, name, slug, mrp, price, quantity, image, category, packing, 0);
              this.items.push(itm);
              this.skuArray.push(itm.sku);
          }

          // save changes
          this.saveItems();
      }
  };

  // get the total price for all items currently in the cart
  ShoppingCart.prototype.getTotalPrice = function (sku) {
      var total = 0;
      for (var i = 0; i < this.items.length; i++) {
          var item = this.items[i];
          if (sku === undefined || item.sku === sku) {
              total += this.toNumber(item.quantity * item.price);
          }
      }
      return total;
  };

  ShoppingCart.prototype.getTotalPriceAfterShipping = function () { //Total Price Including Shipping
      var total = 0;
      total = this.getTotalPrice() ;
      if(total<500){
        total+=20;
      }
      return total;
  };

  // get the total price for all items currently in the cart
  ShoppingCart.prototype.getTotalCount = function (sku) {
      var count = 0;
      for (var i = 0; i < this.items.length; i++) {
          var item = this.items[i];
          if (sku === undefined || item.sku === sku) {
              count += this.toNumber(item.quantity);
          }
      }
      return count;
  };

  // clear the cart
  ShoppingCart.prototype.clearItems = function () {
      this.items = [];
      this.skuArray = [];
      this.saveItems();
  };

  ShoppingCart.prototype.toNumber = function (value) {
      value = value * 1;
      return isNaN(value) ? 0 : value;
  };

  // define checkout parameters
  ShoppingCart.prototype.addCheckoutParameters = function (serviceName, merchantID, options) {

      // check parameters
      if (serviceName !== 'PayPal') {
          throw 'Name of the service must be PayPal.';
      }
      if (merchantID === null) {
          throw ' Need merchantID in order to checkout.';
      }

      // save parameters
      this.checkoutParameters[serviceName] = new checkoutParameters(serviceName, merchantID, options);
  };

  // check out
  ShoppingCart.prototype.checkout = function (serviceName, clearCart) {

      // select serviceName if we have to
      if (serviceName === null) {
          var p = this.checkoutParameters[Object.keys(this.checkoutParameters)[0]];
          serviceName = p.serviceName;
      }

      // sanity
      if (serviceName === null) {
          throw 'Use the addCheckoutParameters method to define at least one checkout service.';
      }

      // go to work
      var parms = this.checkoutParameters[serviceName];
      if (parms === null) {
          throw 'Cannot get checkout parameters for ' + serviceName + '.';
      }
      switch (parms.serviceName) {
          case 'PayPal':
              this.checkoutPayPal(parms, clearCart);
              break;
          default:
              throw 'Unknown checkout service: ' + parms.serviceName;
      }
  };

  // check out using PayPal
  // for details see:
  // www.paypal.com/cgi-bin/webscr?cmd=p/pdn/howto_checkout-outside
  ShoppingCart.prototype.checkoutPayPal = function (parms, clearCart) {

      // global data
      var data = {
          cmd: '_cart',
          business: parms.merchantID,
          upload: '1',
          rm: '2',
          charset: 'utf-8'
      };

      // item data
      for (var i = 0; i < this.items.length; i++) {
          var item = this.items[i];
          var ctr = i + 1;
          data['item_number_' + ctr] = item.sku;
          data['item_name_' + ctr] = item.name;
          data['quantity_' + ctr] = item.quantity;
          data['amount_' + ctr] = item.price.toFixed(2);
      }

      // build form
      var form = $('<form/></form>');
      form.attr('action', 'https://www.paypal.com/cgi-bin/webscr');
      form.attr('method', 'POST');
      form.attr('style', 'display:none;');
      this.addFormFields(form, data);
      this.addFormFields(form, parms.options);
      $('body').append(form);

      // submit form
      this.clearCart = clearCart === null || clearCart;
      form.submit();
      form.remove();
  };


  // utility methods
  ShoppingCart.prototype.addFormFields = function (form, data) {
      if (data !== null) {
          $.each(data, function (name, value) {
              if (value !== null) {
                  var input = $('<input></input>').attr('type', 'hidden').attr('name', name).val(value);
                  form.append(input);
              }
          });
      }
  };

  angular.module('shopnxApp')
    .factory('Cart', function () {
      var myCart = new ShoppingCart('ShopNx');
      myCart.addCheckoutParameters('PayPal', '2lessons@gmail.com');
      return { cart: myCart };
    });
