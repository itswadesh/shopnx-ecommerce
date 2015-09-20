'use strict';

angular.module('shopnxApp')
  .filter('labelCase', [function(){
      return function(input){
        if(!input){
          return input;
        }else{
          input = input.replace(/([A-Z])/g, ' $1');
          return input[0].toUpperCase() + input.slice(1);
        }
      };
  }])
  .filter('camelCase', [function(){
    return function(input){
      if(!input){
        return input;
      }else{
        return input.toLowerCase().replace(/ (\w)/g, function(match, letter){
          return letter.toUpperCase();
        });
      }
    };
  }])

  .filter('reverse', [function() {
    return function(items) {
      if(items){
        return items.slice().reverse();
      }else{
        return items;
      }
    };
  }])

  .filter('active', [function() {
      return function(input) {
          // console.log(input);
        var out = 'I';
        if(input===true){ out='A';}
        return out;
      };
  }])

  .filter('status', [function() {
      return function(input) {
          console.log(input);
        var out = 'I';
        if(input==='0'){ out='A';}
        return out;
      };
  }]);
