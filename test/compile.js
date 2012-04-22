var fs = require('fs');
var Sauerkraut = require('./../src/sauerkraut');

var kraut = new Sauerkraut();
kraut.compile(__dirname+'/skcss/style.skcss', __dirname+'/skcss/style.compiled.css');
kraut.inverse(__dirname+'/css/style.css', __dirname+'/css/style.compiled.skcss');
