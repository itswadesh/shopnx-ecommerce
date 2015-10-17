'use strict';

angular.module('shopnxApp')
  .filter('unique', function() {
      return function(input, key) {
          var unique = {};
          var uniqueList = [];
          for(var i = 0; i < input.length; i++){
              if(typeof unique[input[i][key]] == "undefined"){
                  unique[input[i][key]] = "";
                  uniqueList.push(input[i]);
              }
          }
          return uniqueList;
      };
  })
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
  }])
  .filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          // console.log(item[prop]);
          if(item[prop]==null)
            return;
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  }
});
