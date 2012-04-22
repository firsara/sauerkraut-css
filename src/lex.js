// lex.js
// Sauerkraut Lexikon
var SauerkrautLex = exports = module.exports = (function(){

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
    , 'orange': 'orange'
    , 'auto': 'automatisch'
    , '!important': '!wichtig'
    }
  };

})();