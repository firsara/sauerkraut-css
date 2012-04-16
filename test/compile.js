var fs = require('fs');
var Sauerkraut = require('./../src/sauerkraut');

var kraut = new Sauerkraut();
kraut.compile(__dirname+'/skcss/style.skcss', __dirname+'/css/style.css');
