import express from 'express';
import axios from 'axios';
import Queue from 'queue';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.render('index.html', { title: 'Bot Online' });
});
// Middleware, um eingehende Anfragen in die Warteschlange zu stellen und Fehler zu behandeln
app.use(async (req, res, next) => {
  try {
    const requestQueue = await requestQueuePromise;
    requestQueue.push(async () => {
      const result = await forwardRequest(req); // Funktion, um die Anfrage an den Dienst weiterzuleiten
      res.send(result.data); // Sende die Antwort an den Client zurück
    });
  } catch (error) {
    handleServerError(error, res);
  }
});

// Funktion, um die Anfrage an den Dienst weiterzuleiten
async function forwardRequest(req) {
  // Hier fügst du die Logik hinzu, um die Anfrage an den Dienst zu senden
  // Beispiel mit Axios:
  const response = await axios({
    method: req.method,
    url: req.originalUrl,
    data: req.body,
    // Weitere Optionen entsprechend deiner Anforderungen
  });
  return response;
}

// Funktion zur zentralen Behandlung von Fehlern und zum Senden von entsprechenden Antworten an den Client
function handleServerError(error, res) {
  console.error('Fehler beim Verarbeiten der Anfrage:', error);
  if (error.response) {
    const statusCode = error.response.status;
    let errorMessage = 'An internal server error occurred';
    if (statusCode === 428) {
      errorMessage = 'Connection Closed';
    } else if (statusCode === 429) {
      errorMessage = 'Too many requests';
    }
    res.status(statusCode).send({ error: 'Precondition Required', message: errorMessage });
  } else {
    res.status(500).send({ error: 'Internal Server Error', message: 'An internal server error occurred' });
  }
}

// Starte den Server
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
