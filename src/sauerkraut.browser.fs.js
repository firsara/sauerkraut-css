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

