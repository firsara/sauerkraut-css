// sauerkraut.js
// Sauerkraut General API

var SauerkrautCompiler = require('./compiler')
  , fs = require('fs');

var Sauerkraut = exports = module.exports = function(){};

function trim(s){
  var l = 0; var r = s.length -1;
  while(l < s.length && s[l] == ' ') { l++; }
  while(r > l && s[r] == ' ') { r-=1; }
  return s.substring(l, r+1);
}

Sauerkraut.prototype.fetchImport = function(sourceData){
  var index = sourceData.indexOf('@import');
  if (index === -1) return false;

  var data = sourceData.substring(index);
  var definition = data.substring(0, data.indexOf(';') + 1);
  var importFile = definition.replace(/"/g, '');
  importFile = importFile.replace(/'/g, '');
  importFile = importFile.replace(/;/g, '');
  importFile = importFile.replace(/@import/g, '');
  importFile = trim(importFile);

  return {file: importFile, definition: definition};
};

Sauerkraut.prototype.fetchData = function(source){
  if (source.substring(source.length - 6) !== '.skcss') source = source + '.skcss';
  var folder = source.substring(0, source.lastIndexOf('/') + 1)
    , data = fs.readFileSync(source).toString()
    , importFile;

  while (importFile = this.fetchImport(data))
  {
    data = data.replace(importFile.definition, '');
    data = this.fetchData(folder + importFile.file) + data;
  }

  return data;
};

Sauerkraut.prototype.compile = function(source, destination){
  var data = this.fetchData(source);
  data = SauerkrautCompiler.compile(data);
  if (destination) fs.writeFileSync(destination, data);
  else console.log(data);
};

Sauerkraut.prototype.watch = function(source, destination, interval){
  var self = this;
  self.compile(source, destination);
  
  setInterval(function(){
    self.compile(source, destination);
  }, interval || 10000);
};