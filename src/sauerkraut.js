// sauerkraut.js
// Sauerkraut General API

var compiler = require('./compiler')
  , fs = require('fs');

function Sauerkraut(){}

Sauerkraut.prototype.compile = function(source, destination){
  var data = fs.readFileSync(source).toString();
  data = compiler.compile(data);
  if (destination) fs.writeFileSync(destination, data);
};

Sauerkraut.prototype.watch = function(source, destination, interval){
  var self = this;
  self.compile(source, destination);
  
  setInterval(function(){
    self.compile(source, destination);
  }, interval || 10000);
};

exports = module.exports = Sauerkraut;