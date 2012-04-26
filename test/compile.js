var fs = require('fs');
var Sauerkraut = require('./../src/sauerkraut');
var compiler = require('./../src/compiler');
var jsdiff = require('./jsdiff');

var kraut = new Sauerkraut();
kraut.compile(__dirname+'/skcss/style.skcss', __dirname+'/skcss/style.compiled.css');
kraut.inverse(__dirname+'/css/style.css', __dirname+'/css/style.compiled.skcss');

fs.unlink(__dirname + '/diff.html');

// Actual Test
var source = fs.readFileSync(__dirname+'/css/style.css').toString();
var compiled = compiler.inverse(source);
var reversed = compiler.compile(compiled);

if (reversed.replace(/\s/gi, '') === source.replace(/\s/gi, ''))
{
  console.log('Test successful');
}
else
{
  console.log('Test failed');
  console.log('See Log File (diff.html) for differences!');
  var difference = jsdiff(reversed, source);
  difference = '<!DOCTYPE HTML><html><head></head><body><pre>' + difference + '</pre></body>/</html>';
  fs.writeFileSync(__dirname + '/diff.html', difference);
}
