var SauerkrautLex = require('./lex');

// compiler.js
// Sauerkraut Compiler
var SauerkrautCompiler = exports = module.exports = (function(self){

  var any = "([\\s\\S]*?)";

  self.compile = function(data){
    return compileWith(SauerkrautLex, data);
  };

  self.inverse = function(data){
    var src = SauerkrautLex;
    var lex = {};

    for (var type in src) {
      lex[type] = {};

      for (var key in src[type]) {
        lex[type][src[type][key]] = key;
      }
    }

    return compileWith(lex, data);
  };

  var compileWith = function(lex, data){
    var key;

    for (key in lex.tags){
      data = data.replace(new RegExp(lex.tags[key] + any + "{", 'gi'), key + '$1{');
    }

    for (key in lex.pseudos){
      data = data.replace(new RegExp(lex.pseudos[key] + any + "{", 'gi'), key + '$1{');
    }

    for (key in lex.properties){
      data = data.replace(new RegExp(lex.properties[key] + any + ':', 'gi'), key + '$1:');
    }

    for (key in lex.values){
      data = data.replace(new RegExp(lex.values[key] + any + ';', 'gi'), key + '$1;');
      data = data.replace(new RegExp(lex.values[key] + any + '}', 'gi'), key + '$1}');
    }

    return data;
  };

  return self;

})({});