var Compiler = require('./compiler');

function Sauerkraut(){}

Sauerkraut.prototype.compile = function(source, destination){
  Compiler.compile(source, destination);
};

Sauerkraut.prototype.watch = function(source, destination, interval){
  var self = this;
  self.compile(source, destination);
  
  setInterval(function(){
    self.compile(source, destination);
  }, interval || 10000);
};

exports = module.exports = Sauerkraut;