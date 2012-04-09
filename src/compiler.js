var fs = require('fs');
var lex = require('./lex');

var compiler = exports = module.exports = (function(self){

  self.compile = function(source, destination){
    var data = fs.readFileSync(source).toString();

    for (var key in lex){
      data = data.replace(key, lex[key]);
    }

    if (destination) fs.writeFileSync(destination, data);
    return data;
  };

  return self;

})({});