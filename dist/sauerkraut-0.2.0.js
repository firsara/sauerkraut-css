//
// sauerkraut - Sauerkraut CSS 0.2.0
// http://sauerkrautcss.org
// 
// Copyright (c) 2012, Fabian Irsara <info@fabianirsara.com>
// Contributors: Andreas Penz <info@dopamedia.com>
// Licensed under the Apache 2.0 License.
//

// lex.js
// Sauerkraut Lexikon
var SauerkrautLex = (function(){

  return {
    
    tags: {
      'h1': 'ü1'
    , 'h2': 'ü2'
    , 'h3': 'ü3'
    , 'h4': 'ü4'
    , 'h5': 'ü5'
    , 'h6': 'ü6'
    , 'body': 'körper'
    , 'article': 'artikel'
    }

  , properties: {
      'azimuth' : 'azimuth <- ####### edit'
    , 'background': 'hintergrund'
    , 'background-attachment': 'background-attachment <- ####### edit'
    , 'background-color': 'hintergrund-farbe'
    , 'background-image': 'hintergrund-bild'
    , 'background-position': 'hintergrund-position'
    , 'background-repeat': 'hintergrund-wiederholung'
    , 'border': 'rand'
    , 'border-collapse' : 'rand-kollabs <- ####### edit'
    , 'border-color' : 'rand-farbe'
    , 'border-spacing' : 'rand-abstand'
    , 'border-style' : 'rand-stil'
    , 'border-top' : 'rand-oben'
    , 'border-right' : 'rand-rechts'
    , 'border-bottom' : 'rand-unten'
    , 'border-left' : 'rand-links'
    , 'border-top-color' : 'rand-oben-farbe'
    , 'border-right-color' : 'rand-rechts-farbe'
    , 'border-bottom-color' : 'rand-unten-farbe'
    , 'border-left-color' : 'rand-links-farbe'
    , 'border-top-style' : 'rand-oben-stil'
    , 'border-right-style' : 'rand-rechts-stil'
    , 'border-bottom-style' : 'rand-unten-stil'
    , 'border-left-style' : 'rand-links-stil'
    , 'border-top-width' : 'rand-oben-breite'
    , 'border-right-width' : 'rand-rechts-breite'
    , 'border-bottom-width' : 'rand-unten-breite'
    , 'border-left-width' : 'rand-links-breite'
    , 'border-width' : 'rand-breite'
    , 'bottom' : 'unten'
    , 'caption-side' : 'caption-side <- ####### edit'
    , 'clear' : 'säubern'
    , 'clip' : 'clip <- ####### edit'
    , 'color' : 'farbe'
    , 'content' : 'inhalt'
    , 'counter-increment' : 'counter-increment <- ####### edit'
    , 'counter-reset' : 'counter-reset <- ####### edit'
    , 'cue' : 'cue  <- ####### edit'
    , 'cue-after' : 'cue-after <- ####### edit'
    , 'cue-before' : 'cue-before <- ####### edit'
    , 'cursor' : 'zeiger'
    , 'direction' : 'ausrichtung'
    }

  , values: {

    }
  };

})();

var SauerkrautCompiler = (function(self){

  self.compile = function(data){
    var key;
    var lex = SauerkrautLex;

    for (key in lex.tags){
      data = data.replace(new RegExp(lex.tags[key] + "{", 'g'), key + ' {');
      data = data.replace(new RegExp(lex.tags[key] + "(\\s){", 'g'), key + ' {');
    }

    for (key in lex.properties){
      data = data.replace(new RegExp(lex.properties[key] + ':', 'g'), key + ':');
      data = data.replace(new RegExp(lex.properties[key] + "(\\s):", 'g'), key + ':');
    }

    for (key in lex.values){
      data = data.replace(new RegExp(lex.values[key] + ';', 'g'), key + ';');
      data = data.replace(new RegExp(lex.values[key] + "(\\s);", 'g'), key + ';');
      data = data.replace(new RegExp(lex.values[key] + "}", 'g'), key + '}');
      data = data.replace(new RegExp(lex.values[key] + "\s}", 'g'), key + '}');
    }

    return data;
  };

  return self;

})({});

// sauerkraut.browser.js
// Sauerkraut Browser Adapter
function trim(s)
{
  var l = 0; var r = s.length -1;
  while(l < s.length && s[l] == ' ') { l++; }
  while(r > l && s[r] == ' ') { r-=1; }
  return s.substring(l, r+1);
}

function Sauerkraut(){}

Sauerkraut.prototype.getAjaxHttpRequest = function(){
  var req;
  if (window.XMLHttpRequest && !(window.ActiveXObject)) { try { req = new XMLHttpRequest(); } catch(e) { req = false; } }
  else if (window.ActiveXObject) {
    try { req = new window.ActiveXObject("Msxml2.XMLHTTP"); }
    catch(e2) {
      try { req = new window.ActiveXObject("Microsoft.XMLHTTP"); }
      catch(e3) { req = false; }
    }
  }

  return req;
};

Sauerkraut.prototype.fetchDataSync = function(source){
  var req = this.getAjaxHttpRequest();

  req.open('GET', source, false);
  req.send();

  if (req.readyState.toString() === '4') {
    if (req.status.toString() === '200' || req.status.toString() === '0') {
      return req.responseText;
    } else {
      alert("There was a problem retrieving the XML data:\n" + req.statusText);
    }
    
    req = null;
  }
};

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
    , data = this.fetchDataSync(source)
    , importFile;

  while (importFile = this.fetchImport(data))
  {
    data = data.replace(importFile.definition, '');
    data = this.fetchData(folder + importFile.file) + data;
  }

  return data;
};

Sauerkraut.prototype.compile = function(source, styleTagID){
  if (! styleTagID) styleTagID = 'sauerkraut_' + Math.round(Math.random() * 10000);

  var data = this.fetchData(source);
  data = SauerkrautCompiler.compile(data);

  // remove old Link Tag if there is any
  var styles = document.getElementsByTagName(styleTagID);
  for (var i = 0; i < styles.length; i++) {
    if (styles.item(i).getAttribute('id').toString() === styleTagID) {
      styles.item(i).parentNode.removeChild(styles.item(i));
    }
  }

  var style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.setAttribute('id', styleTagID);

  try {
    style.innerHTML = data;
  } catch(e) {}

  try {
    // IE < 9
    style.styleSheet.cssText = data;
  } catch(e) {}

  document.getElementsByTagName('head').item(0).appendChild(style);
};


// Compile All Related Document Link Tags
(function(){

  var links = document.getElementsByTagName('link')
    , link
    , source
    , kraut;

  for (var i = 0; i < links.length; i++) {
    link = links.item(i);
    if (link.getAttribute('rel').toString() === 'stylesheet/sauerkraut') {
      source = link.getAttribute('href').toString();
      if (source.substr(source.length - 5) === 'skcss') {
        kraut = new Sauerkraut();
        kraut.compile(source);
      }
    }
  }

})();

