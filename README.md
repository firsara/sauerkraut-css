Sauerkraut CSS
==============
Write CSS like a Sauerkraut.
<a href="http://sauerkrautcss.madebyfibb.com/">http://sauerkrautcss.madebyfibb.com/</a>

Explained
---------
Sauerkraut is available as Node module and Browser script.
It parses skcss files (css written in german) and converts it to the appropriate css code


Setup
------
### Grab the latest stable version:

    npm install sauerkraut

Examples
--------

### Here's some Kraut:

    körper {
      schrift-größe: 12px;
      schrift-familie: 'Arial';
    }

    artikel {
      breite: 600px;
      rand: automatisch;
      innenrand: 20px;
    }

### Which compiles to this CSS:

    body {
      font-size: 12px;
      font-family: 'Arial';
    }

    article {
      width: 600px;
      margin: auto;
      padding: 20px;
    }

### Compile:
    var Sauerkraut = require('sauerkraut');
    var kraut = new Sauerkraut();
    kraut.compile('/path/to/input.skcss', 'path/to/output.css');
    kraut.inverse('/path/to/input.css', 'path/to/output.skcss');

### Annotation:
  Sauerkraut works in both ways.
  You can compile your CSS to kraut or your kraut to CSS.


Command Line Tool
-----------------

### Install Sauerkraut globally:
    npm install -g sauerkraut

### Use Command Line Tool:
    sauerkraut input.skcss output.css