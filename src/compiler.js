var fs = require('fs');
var lex = require('./lex');

var compiler = exports = module.exports = (function(self){

  self.compile = function(source, destination){
    var data = fs.readFileSync(source).toString();
    var key;

    for (key in lex.tags){
      data = data.replace(new RegExp(lex.tags[key] + "(\\s){", 'g'), key + ' {');
    }

    for (key in lex.properties){
      data = data.replace(new RegExp(lex.properties[key] + ':', 'g'), key + ':');
      data = data.replace(new RegExp(lex.properties[key] + "(\\s):", 'g'), key + ':');
    }

    for (key in lex.values){
      data = data.replace(new RegExp(lex.values[key] + ';', 'g'), key + ';');
      data = data.replace(new RegExp(lex.values[key] + "(\\s);", 'g'), key + ';');
      data = data.replace(new RegExp(lex.values[key] + "}", 'g'), key + '}');
      data = data.replace(new RegExp(lex.values[key] + "\s}", 'g'), key + '}');
    }

    console.log(data);
    if (destination) fs.writeFileSync(destination, data);

    return data;
  };

  return self;

})({});