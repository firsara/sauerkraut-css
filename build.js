var fs = require('fs');

String.prototype.toJSON = function(){
  return JSON.parse(this)
};

var config = fs.readFileSync(__dirname+'/package.json').toString().toJSON();

var head = fs.readFileSync(__dirname+'/src/head').toString();
var compiler = fs.readFileSync(__dirname+'/src/compiler.js').toString();
var lex = fs.readFileSync(__dirname+'/src/lex.js').toString();
var sauerkraut = fs.readFileSync(__dirname+'/src/sauerkraut.browser.js').toString();

head = head.replace(/@NAME/g, config.name.toString());
head = head.replace(/@DESCRIPTION/g, config.description.toString());
head = head.replace(/@VERSION/g, config.version.toString());
head = head.replace(/@URL/g, config.url.toString());
head = head.replace(/@AUTHOR/g, config.author.toString());
head = head.replace(/@CONTRIBUTORS/g, config.contributors.toString());

compiler = compiler.substr(compiler.indexOf('var SauerkrautCompiler ='));

var output = head+"\n\n"+lex+"\n\n"+compiler+"\n\n"+sauerkraut;
output = output.replace(/ = exports = module.exports/g, '');

fs.writeFile(__dirname+'/dist/sauerkraut.js', output);
fs.writeFile(__dirname+'/dist/sauerkraut-'+config.version.toString()+'.js', output);

try
{
  // Minify output
  var jsp = require("uglify-js").parser;
  var pro = require("uglify-js").uglify;

  var ast = jsp.parse(output); // parse code and get the initial AST
  ast = pro.ast_mangle(ast); // get a new AST with mangled names
  ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
  output = pro.gen_code(ast); // compressed code here

  fs.writeFile(__dirname+'/dist/sauerkraut.min.js', output);
  fs.writeFile(__dirname+'/dist/sauerkraut-'+config.version.toString()+'.min.js', output);
}
catch(e)
{
  console.log("Cannot minify Output. Try:\nnpm install uglify-js");
}