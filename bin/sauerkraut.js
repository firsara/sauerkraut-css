#!/usr/bin/env node

var path = require('path');
var Sauerkraut = require('./../src/sauerkraut');

var args = process.argv.slice(1);

var input = args[1];
if (input && input != '-') {
    input = path.resolve(process.cwd(), input);
}

var output = args[2];
if (output) {
    output = path.resolve(process.cwd(), output);
}

if (! input) {
    console.log("sauerkraut: no input files");
    process.exit(1);
}

if (! output) {
    console.log("sauerkraut: no output files");
    process.exit(1);
}

var kraut = new Sauerkraut();
kraut.compile(input, output);