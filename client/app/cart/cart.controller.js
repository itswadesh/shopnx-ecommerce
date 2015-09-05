'use strict';

angular.module('shopnxApp')
  .controller('CartCtrl', function ($scope, Cart2, $stateParams) {
    $scope.store = Cart2.store;
    $scope.cart = Cart2.cart;

    // use routing to pick the selected product
    if ($stateParams.productSku != null) {
        $scope.product = $scope.store.getProduct($stateParams.productSku);
    }
  })
//
//   .factory("Cart2", function () {
//
//     // create store
//     var myStore = new store();
//
//     // create shopping cart
//     var myCart = new shoppingCart("MyStore");
//
//     // enable PayPal checkout
//     // note: the second parameter identifies the merchant; in order to use the
//     // shopping cart with PayPal, you have to create a merchant account with
//     // PayPal. You can do that here:
//     // https://www.paypal.com/webapps/mpp/merchant
//     myCart.addCheckoutParameters("PayPal", "mahantesh.nagathan@gmail.com");
//
//     // enable Google Wallet checkout
//     // note: the second parameter identifies the merchant; in order to use the
//     // shopping cart with Google Wallet, you have to create a merchant account with
//     // Google. You can do that here:
//     // https://developers.google.com/commerce/wallet/digital/training/getting-started/merchant-setup
//    /* myCart.addCheckoutParameters("Google", "500640663394527",
//         {
//             ship_method_name_1: "UPS Next Day Air",
//             ship_method_price_1: "20.00",
//             ship_method_currency_1: "USD",
//             ship_method_name_2: "UPS Ground",
//             ship_method_price_2: "15.00",
//             ship_method_currency_2: "USD"
//         }
//     );*/
//
//     // return data object with store and cart
//     return {
//         store: myStore,
//         cart: myCart
//     };
// });
// //----------------------------------------------------------------
// // shopping cart
// //
// function shoppingCart(cartName) {
//     this.cartName = cartName;
//     this.clearCart = false;
//     this.checkoutParameters = {};
//     this.items = [];
//
//     // load items from local storage when initializing
//     this.loadItems();
//
//     // save items to local storage when unloading
//     var self = this;
//     $(window).unload(function () {
//         if (self.clearCart) {
//             self.clearItems();
//         }
//         self.saveItems();
//         self.clearCart = false;
//     });
// }
//
// // load items from local storage
// shoppingCart.prototype.loadItems = function () {
//     var items = localStorage != null ? localStorage[this.cartName + "_items"] : null;
//     if (items != null && JSON != null) {
//         try {
//             var items = JSON.parse(items);
//             for (var i = 0; i < items.length; i++) {
//                 var item = items[i];
//                 if (item.sku != null && item.name != null && item.price != null && item.quantity != null) {
//                     item = new cartItem(item.sku, item.name, item.price, item.quantity);
//                     this.items.push(item);
//                 }
//             }
//         }
//         catch (err) {
//             // ignore errors while loading...
//         }
//     }
// }
//
// // save items to local storage
// shoppingCart.prototype.saveItems = function () {
//     if (localStorage != null && JSON != null) {
//         localStorage[this.cartName + "_items"] = JSON.stringify(this.items);
//     }
// }
//
// // adds an item to the cart
// shoppingCart.prototype.addItem = function (sku, name, price, quantity) {
//     console.log(this.items);
//     quantity = this.toNumber(quantity);
//     if (quantity != 0) {
//
//         // update quantity for existing item
//         var found = false;
//         for (var i = 0; i < this.items.length && !found; i++) {
//             var item = this.items[i];
//             if (item.sku == sku) {
//                 found = true;
//                 item.quantity = this.toNumber(item.quantity + quantity);
//                 if (item.quantity <= 0) {
//                     this.items.splice(i, 1);
//                 }
//             }
//         }
//
//         // new item, add now
//         if (!found) {
//             var item = new cartItem(sku, name, price, quantity);
//             this.items.push(item);
//         }
//
//         // save changes
//         this.saveItems();
//     }
// }
//
// // get the total price for all items currently in the cart
// shoppingCart.prototype.getTotalPrice = function (sku) {
//     var total = 0;
//     for (var i = 0; i < this.items.length; i++) {
//         var item = this.items[i];
//         if (sku == null || item.sku == sku) {
//             total += this.toNumber(item.quantity * item.price);
//         }
//     }
//     return total;
// }
//
// // get the total price for all items currently in the cart
// shoppingCart.prototype.getTotalCount = function (sku) {
//     var count = 0;
//     for (var i = 0; i < this.items.length; i++) {
//         var item = this.items[i];
//         if (sku == null || item.sku == sku) {
//             count += this.toNumber(item.quantity);
//         }
//     }
//     return count;
// }
//
// // clear the cart
// shoppingCart.prototype.clearItems = function () {
//     this.items = [];
//     this.saveItems();
// }
//
// // define checkout parameters
// shoppingCart.prototype.addCheckoutParameters = function (serviceName, merchantID, options) {
//
//     // check parameters
//     if (serviceName != "PayPal") {
//         throw "Name of the service must be 'PayPal'.";
//     }
//     if (merchantID == null) {
//         throw " Need merchantID in order to checkout.";
//     }
//
//     // save parameters
//     this.checkoutParameters[serviceName] = new checkoutParameters(serviceName, merchantID, options);
// }
//
// // check out
// shoppingCart.prototype.checkout = function (serviceName, clearCart) {
//
//     // select serviceName if we have to
//     if (serviceName == null) {
//         var p = this.checkoutParameters[Object.keys(this.checkoutParameters)[0]];
//         serviceName = p.serviceName;
//     }
//
//     // sanity
//     if (serviceName == null) {
//         throw "Use the 'addCheckoutParameters' method to define at least one checkout service.";
//     }
//
//     // go to work
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
// // check out using PayPal
// // for details see:
// // www.paypal.com/cgi-bin/webscr?cmd=p/pdn/howto_checkout-outside
// shoppingCart.prototype.checkoutPayPal = function (parms, clearCart) {
//
//     // global data
//     var data = {
//         cmd: "_cart",
//         business: parms.merchantID,
//         upload: "1",
//         rm: "2",
//         charset: "utf-8"
//     };
//
//     // item data
//     for (var i = 0; i < this.items.length; i++) {
//         var item = this.items[i];
//         var ctr = i + 1;
//         data["item_number_" + ctr] = item.sku;
//         data["item_name_" + ctr] = item.name;
//         data["quantity_" + ctr] = item.quantity;
//         data["amount_" + ctr] = item.price.toFixed(2);
//     }
//
//     // build form
//     var form = $('<form/></form>');
//     form.attr("action", "https://www.paypal.com/cgi-bin/webscr");
//     form.attr("method", "POST");
//     form.attr("style", "display:none;");
//     this.addFormFields(form, data);
//     this.addFormFields(form, parms.options);
//     $("body").append(form);
//
//     // submit form
//     this.clearCart = clearCart == null || clearCart;
//     form.submit();
//     form.remove();
// }
//
// // check out using Google Wallet
// // for details see:
// // developers.google.com/checkout/developer/Google_Checkout_Custom_Cart_How_To_HTML
// // developers.google.com/checkout/developer/interactive_demo
// /*shoppingCart.prototype.checkoutGoogle = function (parms, clearCart) {
//
//     // global data
//     var data = {};
//
//     // item data
//     for (var i = 0; i < this.items.length; i++) {
//         var item = this.items[i];
//         var ctr = i + 1;
//         data["item_name_" + ctr] = item.sku;
//         data["item_description_" + ctr] = item.name;
//         data["item_price_" + ctr] = item.price.toFixed(2);
//         data["item_quantity_" + ctr] = item.quantity;
//         data["item_merchant_id_" + ctr] = parms.merchantID;
//     }
//
//     // build form
//     var form = $('<form/></form>');
//     // NOTE: in production projects, use the checkout.google url below;
//     // for debugging/testing, use the sandbox.google url instead.
//     //form.attr("action", "https://checkout.google.com/api/checkout/v2/merchantCheckoutForm/Merchant/" + parms.merchantID);
//     form.attr("action", "https://sandbox.google.com/checkout/api/checkout/v2/checkoutForm/Merchant/" + parms.merchantID);
//     form.attr("method", "POST");
//     form.attr("style", "display:none;");
//     this.addFormFields(form, data);
//     this.addFormFields(form, parms.options);
//     $("body").append(form);
//
//     // submit form
//     this.clearCart = clearCart == null || clearCart;
//     form.submit();
//     form.remove();
// }
// */
// // utility methods
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
// shoppingCart.prototype.toNumber = function (value) {
//     value = value * 1;
//     return isNaN(value) ? 0 : value;
// }
//
// //----------------------------------------------------------------
// // checkout parameters (one per supported payment service)
// //
// function checkoutParameters(serviceName, merchantID, options) {
//     this.serviceName = serviceName;
//     this.merchantID = merchantID;
//     this.options = options;
// }
//
// //----------------------------------------------------------------
//
// function cartItem(sku, name, price, quantity) {
//     this.sku = sku;
//     this.name = name;
//     this.price = price * 1;
//     this.quantity = quantity * 1;
// }
//
// function store() {
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
// store.prototype.getProduct = function (sku) {
//     for (var i = 0; i < this.rings.length; i++) {
//         if (this.rings[i].sku == sku)
//             return this.rings[i];
//     }
//     return null;
// }
