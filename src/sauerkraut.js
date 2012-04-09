var Compiler = require('./compiler');

function Sauerkraut(){}

Sauerkraut.prototype.compile = function(source, destination){
  Compiler.compile(source, destination);
};

exports = module.exports = Sauerkraut;