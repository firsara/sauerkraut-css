// compiler.js
// Sauerkraut Compiler
var SauerkrautLex = require('./lex');

var compiler = exports = module.exports = (function(self){

  self.compile = function(data){
    var key;
    var lex = SauerkrautLex;

    for (key in lex.tags){
      data = data.replace(new RegExp(lex.tags[key] + "{", 'g'), key + ' {');
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

    return data;
  };

  return self;

})({});