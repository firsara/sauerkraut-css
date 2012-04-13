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

  function fetchStylesheet(source){
    var folder = source.substring(source.lastIndexOf('/'));
    var data = fetchAjaxSync(source);

    // TODO: fetch @import directives
    var imports = [];

    return data;
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
        var data = fetchStylesheet(source);
        data = SauerkrautCompiler.compile(data);

        style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.innerHTML = data;
        document.getElementsByTagName('head').item(0).appendChild(style);
      }
    }
  }

})();

