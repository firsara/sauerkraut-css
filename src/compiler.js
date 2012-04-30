var SauerkrautLex = require('./lex');

// compiler.js
// Sauerkraut Compiler
var SauerkrautCompiler = exports = module.exports = (function(self){

  var any = "([\\s\\S]*?)";
  var word = "([\\S]*?)";
  var space = "([\\s]*?)";

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

  var convert = function(key){
    key = key.replace(/Ä/g, '_AE_');
    key = key.replace(/ä/g, '_ae_');
    key = key.replace(/Ü/g, '_UE_');
    key = key.replace(/ü/g, '_ue_');
    key = key.replace(/Ö/g, '_OE_');
    key = key.replace(/ö/g, '_oe_');
    key = key.replace(/ß/g, '_ss_');
    key = key.replace(/@/g, '_at_');

    return key;
  };

  var compileWith = function(lex, data){
    var key;

    data = '}' + data;
    data = convert(data);

    for (key in lex.properties){
      data = data.replace(new RegExp('{' + any + '(' + convert(lex.properties[key]) + ')' + any + ":", 'gi'), '{' + '$1' + key + '$3' + ':');
    }

    for (key in lex.values){
      data = data.replace(new RegExp(':' + any + '(' + convert(lex.values[key]) + ')' + any + ";", 'gi'), ':' + '$1' + key + '$3' + ';');
    }

    for (key in lex.pseudos){
      data = data.replace(new RegExp('}' + any + "(\\b)" + '(' + convert(lex.pseudos[key]) + ')' + "(\\b)" + any + "{", 'gi'), '}' + '$1' + '$2' + key + '$4' + '$5{');
    }

    for (key in lex.tags){
      data = data.replace(new RegExp('}' + any + "(\\b)" + '(' + convert(lex.tags[key]) + ')' + "(\\b)" + any + "([^{])", 'gi'), '}' + '$1' + '$2' + key + '$4' + '$5$6');
    }

    return data.substring(1);
  };

  return self;

})({});