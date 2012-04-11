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

// Compile All Related Document Link Tags
(function(){

  function getAjaxHttpRequest(){
    if (window.XMLHttpRequest && !(window.ActiveXObject)) { try { req = new XMLHttpRequest(); } catch(e) { req = false; } }
    else if (window.ActiveXObject) {
      try { req = new window.ActiveXObject("Msxml2.XMLHTTP"); }
      catch(e2) {
        try { req = new window.ActiveXObject("Microsoft.XMLHTTP"); }
        catch(e3) { req = false; }
      }
    }

    return req;
  }

  function fetchAjaxSync(source){
    var req = getAjaxHttpRequest();

    req.open('GET', source, false);
    req.send();

    if (req.readyState.toString() === '4') {
      // only if "OK"
      if (req.status.toString() === '200' || req.status.toString() === '0') {
        return req.responseText;
      } else {
        alert("There was a problem retrieving the XML data:\n" + req.statusText);
      }
      
      req = null;
    }
  }


  var links = document.getElementsByTagName('link')
    , link
    , style
    , source
    , kraut;

  for (var i = 0; i < links.length; i++) {
    link = links.item(i);
    if (link.getAttribute('rel').toString() === 'stylesheet/sauerkraut') {
      source = link.getAttribute('href').toString();
      if (source.substr(-5) === 'skcss') {
        var data = fetchAjaxSync(source);
        data = SauerkrautCompiler.compile(data);

        style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.innerHTML = data;
        document.getElementsByTagName('head').item(0).appendChild(style);
      }
    }
  }

})();

