'use strict';

angular.module('shopnxApp')
  .factory('Cart', function () {
    var myCart = new shoppingCart("ShopNx");
    myCart.addCheckoutParameters("PayPal", "2lessons@gmail.com");
    return { cart: myCart }
  });

  function store() {
  }

  function shoppingCart(cartName) {
      this.cartName = cartName;
      this.clearCart = false;
      this.checkoutParameters = {};
      this.items = [];
      this.skuArray = [];
      // load items from local storage when initializing
      this.loadItems();
  }

  // load items from local storage
  shoppingCart.prototype.loadItems = function () {
      var items = localStorage != null ? localStorage[this.cartName + "_items"] : null;
      if (items != null && JSON != null) {
          try {
              var items = JSON.parse(items);
              for (var i = 0; i < items.length; i++) {
                  var item = items[i];
                  if (item.sku != null && item.name != null && item.price != null) {
                      item = new cartItem(item.sku, item.name, item.mrp, item.price, item.quantity, item.image, item.category, item.packing, item.status);
                      this.items.push(item);
                      this.skuArray.push(item.sku);
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
  shoppingCart.prototype.addItem = function (sku, name, mrp, price, quantity, image, category, packing, cart) {
      quantity = this.toNumber(quantity);
      if (quantity != 0) {
          // update quantity for existing item
          var found = false;
          for (var i = 0; i < this.items.length && !found; i++) {
              var item = this.items[i];
              if (item.sku == sku) {
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
              var item = new cartItem(sku, name, mrp, price, quantity, image, category, packing, 0);
              this.items.push(item);
              this.skuArray.push(item.sku);
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

  shoppingCart.prototype.getTotalPriceAfterShipping = function (sku) { //Total Price Including Shipping
      var total = 0;
      total = this.getTotalPrice() ;
      if(total<500)
      total+=20;
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
      this.skuArray = [];
      this.saveItems();
  }

  shoppingCart.prototype.toNumber = function (value) {
      value = value * 1;
      return isNaN(value) ? 0 : value;
  }

  //----------------------------------------------------------------
  // items in the cart
  //
  function cartItem(sku, name, mrp, price, quantity, image, category, packing) {
      this.sku = sku;
      this.name = name;
      this.image = image;
      this.category = category;
      this.packing = packing;
      this.mrp = mrp;
      this.price = price * 1;
      this.quantity = quantity * 1;
      this.status = 0;
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

  //----------------------------------------------------------------
  // checkout parameters (one per supported payment service)
  //
  function checkoutParameters(serviceName, merchantID, options) {
      this.serviceName = serviceName;
      this.merchantID = merchantID;
      this.options = options;
  }

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
