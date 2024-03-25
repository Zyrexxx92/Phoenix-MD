const fs = require('fs');
const syntaxError = require('syntax-error');

const fileName = './Core.js'; // Pfad zur zu überprüfenden Datei

// Datei lesen
fs.readFile(fileName, 'utf8', function(err, content) {
  if (err) {
    console.error('Fehler beim Lesen der Datei:', err);
    return;
  }

  // Syntaxfehler überprüfen
  const error = syntaxError(content, fileName);
  if (error) {
    console.error('Syntaxfehler gefunden:', error);
  } else {
    console.log('Keine Syntaxfehler gefunden. Alles ist in Ordnung.');
  }
});
