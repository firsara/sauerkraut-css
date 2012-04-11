var fs = require('fs');

var compiler = fs.readFileSync(__dirname+'/src/compiler.js').toString();
var lex = fs.readFileSync(__dirname+'/src/lex.js').toString();
var sauerkraut = fs.readFileSync(__dirname+'/src/sauerkraut.browser.js').toString();

lex = lex.replace(/ = exports = module.exports/, '');

compiler = compiler.substr(compiler.indexOf('var compiler ='));
compiler = compiler.replace(/var compiler = exports = module.exports =/, 'var SauerkrautCompiler =');

var output = lex+"\n\n"+compiler+"\n\n"+sauerkraut;


fs.writeFile(__dirname+'/dist/sauerkraut.js', output);

try
{
  // Minify output
  var jsp = require("uglify-js").parser;
  var pro = require("uglify-js").uglify;

  var ast = jsp.parse(output); // parse code and get the initial AST
  ast = pro.ast_mangle(ast); // get a new AST with mangled names
  ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
  var minified = pro.gen_code(ast); // compressed code here

  fs.writeFile(__dirname+'/dist/sauerkraut.min.js', minified);
}
catch(e)
{
  console.log("Cannot minify Output. Try:\nnpm install uglify-js");
}