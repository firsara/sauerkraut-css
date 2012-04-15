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

