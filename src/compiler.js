var fs = require('fs');
var lex = require('./lex');

var compiler = exports = module.exports = (function(self){

  self.compile = function(source, destination){
    var data = fs.readFileSync(source).toString();

    for (var type in lex){
      for (var key in lex[type]){
        console.log(lex[type][key] + ' -> ' + key)
        data = data.replace(new RegExp(lex[type][key], 'g'), key);
      }
    }

    if (destination) fs.writeFileSync(destination, data);
    return data;
  };

  return self;

})({});