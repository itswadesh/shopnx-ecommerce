'use strict';

angular.module('angularFullstackApp')
  .filter('filter', function () {
    return function (input) {
      return 'filter filter: ' + input;
    };
  })

  .filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
    };
  })

  .filter('dateToISO', function() {
    return function(input) {
      input = new Date(input).toISOString();
      return input;
    };
  })

  .filter('active', function() {
      return function(input) {
          // console.log(input);
        var out = "I";
        if(input==true){ out='A';}
        return out;
      };
  })

  .filter('status', function() {
      return function(input) {
          console.log(input);
        var out = "I";
        if(input=='0'){ out='A';}
        return out;
      };
  })

  .filter('bytes', function() {
    return function(bytes, precision) {
    if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
    if (typeof precision === 'undefined') precision = 1;
    var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
    number = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + ' ' + units[number];
    }
  });
