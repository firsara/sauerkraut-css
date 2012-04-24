//
// sauerkraut - Sauerkraut CSS 0.3.1
// http://sauerkrautcss.org
// 
// Copyright (c) 2012, Fabian Irsara <info@fabianirsara.com>
// Contributors: Andreas Penz <info@dopamedia.com>
// Licensed under the Apache 2.0 License.
//

// sauerkraut.browser.fs.js
// Sauerkraut Browser FileSystem Wrapper
var fs = {};

fs.getAjaxHttpRequest = function(){
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

fs.readFileSync = function(source){
  var req = fs.getAjaxHttpRequest();

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

fs.writeFileSync = function(styleTagID, data){
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



// lex.js
// Sauerkraut Lexikon
var SauerkrautLex = (function(){

  return {
    
    tags: {
      '@font-face': '@schrift-gesicht'
    , 'h1': 'ü1'
    , 'h2': 'ü2'
    , 'h3': 'ü3'
    , 'h4': 'ü4'
    , 'h5': 'ü5'
    , 'h6': 'ü6'
    , 'body': 'körper'
    , 'article': 'artikel'
    , 'abbr': 'abkürzung'
    , 'acronym': 'akronym'
    , 'address': 'adresse'
    , 'area': 'bereich'
    , 'strong': 'stark'
    , 'base': 'basis'
    , 'big': 'groß'
    , 'small': 'klein'
    , 'button': 'knopf'
    , 'div': 'box'
    , 'em': 'betont'
    , 'fieldset': 'feldset'
    , 'img': 'bild'
    , 'label': 'bezeichner'
    , 'legend': 'legende'
    , 'input': 'eingabe'
    , 'select': 'auswahl'
    , 'span': 'brücke'
    , 'table': 'tabelle'
    , 'ul': 'liste'
    , 'li': 'listenelement'
    , 'a': 'anker'
    , 'b': 'fett'
    , 'i': 'schief'
    , 'u': 'unterstrichen'
    , 'p': 'absatz'
    }

  , pseudos: {
      'first-child': 'erstes-kind'
    , 'not': 'nicht'
    , 'visited': 'angesehen'
    , 'active': 'aktiv'
    , 'hover': 'über'
    , 'focus': 'fokus'
    , 'first-letter': 'erstes-zeichen'
    , 'first-line': 'erste-zeile'
    , 'before': 'davor'
    , 'after': 'danach'
    , 'lang': 'sprache'
    , 'last-child': 'letzes-kind'
    , 'nth-child': 'ntes-kind'
  }

  , properties: {
      'azimuth': 'winkel'
    , 'background': 'hintergrund'
    , 'background-attachment': 'hintergrund-anhang'
    , 'background-color': 'hintergrund-farbe'
    , 'background-image': 'hintergrund-bild'
    , 'background-position': 'hintergrund-position'
    , 'background-repeat': 'hintergrund-wiederholung'
    , 'border': 'rahmen'
    , 'border-collapse': 'rahmen-kollaps'
    , 'border-color': 'rahmen-farbe'
    , 'border-spacing': 'rahmen-abstand'
    , 'border-style': 'rahmen-stil'
    , 'border-top': 'rahmen-oben'
    , 'border-right': 'rahmen-rechts'
    , 'border-bottom': 'rahmen-unten'
    , 'border-left': 'rahmen-links'
    , 'border-top-color': 'rahmen-oben-farbe'
    , 'border-right-color': 'rahmen-rechts-farbe'
    , 'border-bottom-color': 'rahmen-unten-farbe'
    , 'border-left-color': 'rahmen-links-farbe'
    , 'border-top-style': 'rahmen-oben-stil'
    , 'border-right-style': 'rahmen-rechts-stil'
    , 'border-bottom-style': 'rahmen-unten-stil'
    , 'border-left-style': 'rahmen-links-stil'
    , 'border-top-width': 'rahmen-oben-breite'
    , 'border-right-width': 'rahmen-rechts-breite'
    , 'border-bottom-width': 'rahmen-unten-breite'
    , 'border-left-width': 'rahmen-links-breite'
    , 'border-width': 'rahmen-breite'
    , 'bottom': 'unten'
    , 'caption-side': 'untertitel-seite'
    , 'clear': 'säubern'
    , 'clip': 'kürzen'
    , 'color': 'farbe'
    , 'content': 'inhalt'
    , 'counter-increment': 'zähler-erhöhung'
    , 'counter-reset': 'zähler-zurücksetzung'
    , 'cue': 'stichwort'
    , 'cue-after': 'stichwort-danach'
    , 'cue-before': 'stichwort-davor'
    , 'cursor': 'zeiger'
    , 'direction': 'richtung'
    , 'display': 'anzeige'
    , 'elevation': 'erhöhung'
    , 'empty-cells': 'leere-zellen'
    , 'float': 'gleiten'
    , 'font': 'schrift'
    , 'font-family': 'schrift-familie'
    , 'font-size': 'schrift-größe'
    , 'font-size-adjust': 'schrift-größe-anpassung'
    , 'font-stretch': 'schrift-ausdehnung'
    , 'font-style': 'schrift-stil'
    , 'font-variant': 'schrift-variante'
    , 'font-weight': 'schrift-gewicht'
    , 'height': 'höhe'
    , 'left': 'links'
    , 'letter-spacing': 'zeichen-abstand'
    , 'line-height': 'zeilen-höhe'
    , 'list-style': 'listen-stil'
    , 'list-style-image': 'listen-stil-bild'
    , 'list-style-position': 'listen-stil-position'
    , 'list-style-type': 'list-stil-typ'
    , 'margin': 'rand'
    , 'margin-top': 'rand-oben'
    , 'margin-right': 'rand-rechts'
    , 'margin-bottom': 'rand-unten'
    , 'margin-left': 'rand-links'
    , 'marker-offset': 'rand-versetzung'
    , 'marks': 'markierungen'
    , 'max-height': 'maximal-höhe'
    , 'max-width': 'maximal-breite'
    , 'min-height': 'minimal-höhe'
    , 'min-width': 'minimal-breite'
    , 'orphans': 'waisen'
    , 'outline': 'kontur'
    , 'outline-color': 'kontur-farbe'
    , 'outline-style': 'kontur-stil'
    , 'outline-width': 'kontur-breite'
    , 'overflow': 'überlauf'
    , 'padding': 'innenrand'
    , 'padding-top': 'innenrand-oben'
    , 'padding-right': 'innenrand-rechts'
    , 'padding-bottom': 'innenrand-unten'
    , 'padding-left': 'innenrand-links'
    , 'page': 'seite'
    , 'page-break-after': 'seiten-umbruch-davor'
    , 'page-break-before': 'seiten-umbruch-danach'
    , 'page-break-inside': 'seiten-umbruch-innen'
    , 'pause': 'pause'
    , 'pause-after': 'pause-davor'
    , 'pause-before': 'pause-danach'
    //, 'pitch': 'pitch'
    //, 'pitch-range': 'ausrichtung'
    //, 'play-during': 'ausrichtung'
    , 'position': 'position'
    , 'quotes': 'zitate'
    , 'richness': 'reichtum'
    , 'right': 'rechts'
    , 'size': 'größe'
    , 'speak': 'sprechen'
    , 'speak-header': 'sprechen-kopfzeile'
    , 'speak-numeral': 'sprechen-numerisch'
    , 'speak-punctuation': 'sprechen-zeichensetzung'
    , 'speech-rate': 'sprechen-rate'
    //, 'stress': 'stress'
    , 'table-layout': 'tabellen-layout'
    , 'text-align': 'tabellen-ausrichtung'
    , 'text-decoration': 'text-dekoration'
    , 'text-indent': 'text-einrückung'
    , 'text-shadow': 'text-schatten'
    , 'text-transform': 'text-transformation'
    , 'top': 'oben'
    //, 'unicode-bidi': 'unicode-bidi'
    , 'vertical-align': 'vertikale-ausrichtung'
    , 'visibility': 'sichtbarkeit'
    , 'voice-family': 'stimmen-familie'
    , 'volume': 'lautstärke'
    , 'white-space': 'weißraum'
    , 'widows': 'witwen'
    , 'width': 'breite'
    , 'word-spacing': 'wort-abstand'
    , 'z-index': 'ebene'
    , 'transition': 'übergang'
    }

  , values: {
      'red': 'rot'
    , 'green': 'grün'
    , 'blue': 'blau'
    , 'grey': 'grau'
    , 'orange': 'orange'
    , 'auto': 'automatisch'
    , 'left': 'links'
    , 'bold': 'fett'
    , 'right': 'right'
    , 'none': 'keines'
    , 'solid': 'durchgezogen'
    , 'relative': 'relativ'
    , 'absolute': 'absolut'
    , 'static': 'statisch'
    , '!important': '!wichtig'
    }
  };

})();

var SauerkrautCompiler = (function(self){

  var any = "([\\s\\S]*?)";
  var word = "([\\S]*?)";
  var space = "([\\s]*?)";

  self.compile = function(data){
    return compileWith(SauerkrautLex, data);
  };

  self.inverse = function(data){
    var src = SauerkrautLex;
    var lex = {};

    for (var type in src) {
      lex[type] = {};

      for (var key in src[type]) {
        lex[type][src[type][key]] = key;
      }
    }

    return compileWith(lex, data);
  };

  var compileWith = function(lex, data){
    var key;

    for (key in lex.properties){
      data = data.replace(new RegExp("([\\s])" + lex.properties[key] + space + ':', 'gi'), '$1' + key + '$2:');
    }

    for (key in lex.values){
      data = data.replace(new RegExp(lex.values[key] + any + ';', 'gi'), key + '$1;');
    }

    for (key in lex.pseudos){
      data = data.replace(new RegExp(lex.pseudos[key] + any + "{", 'gi'), key + '$1{');
    }

    for (key in lex.tags){
      data = data.replace(new RegExp("\\b" + lex.tags[key] + "\\b" + any + "{", 'gi'), key + '$1{');
    }

    return data;
  };

  return self;

})({});

var Sauerkraut = function(){};

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

Sauerkraut.prototype.fetchData = function(source, check){
  if (check !== false && source.substring(source.length - 6) !== '.skcss') source = source + '.skcss';
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
  return data;
};

Sauerkraut.prototype.inverse = function(source, destination){
  var data = this.fetchData(source, false);
  data = SauerkrautCompiler.inverse(data);
  if (destination) fs.writeFileSync(destination, data);
  else console.log(data);
  return data;
};

Sauerkraut.prototype.watch = function(source, destination, interval){
  var self = this;
  self.compile(source, destination);
  
  setInterval(function(){
    self.compile(source, destination);
  }, interval || 10000);
};

// sauerkraut.browser.js
// Sauerkraut Browser Adapter
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
        kraut.compile(source, 'sauerkraut_' + Math.round(Math.random() * 10000));
      }
    }
  }

})();

